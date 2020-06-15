var express = require('express');
var router = express.Router();
const formidable = require('formidable');
var csvParser = require('csv-parser');
var fs = require('fs');
//model of the schema
let Schedule = require('../models/schedule.model');

var waitforfileInformation = false;
var filenum = "1234";

//uploaded file needs to be processed and stored in a database
var handleUploadedFile = async function(req, res, next){
    const form = formidable({ multiples: true });

    form.parse(req);

    form.on('fileBegin', function(name, file){
      //change this to appropriate file system************************************************remember to change***********
      file.name=filenum;
      file.path=`${__dirname}\\temp_uploads\\${file.name}`;
    });

    form.on('file',function(name, file){
      console.log("uploaded file"+file.name);
    })

    form.on('error', (err) => {
      console.log(err);
      throw err;
    });

    //return randomly generated 4 digit code with the successful response 
    res.send({secret_tempcode:1234});
    res.end();
}


var handleFileInformation = async function(req, res, next){
  //take the information from request validate information and pass to updateDatabase
  //updateDatabase(req, res, next),
  console.log(req.body);
  //need to process the data and remove BOM UTF-8 characters from the CSV
  await processCSV();

  //reads all rows from the csv and parses it into this array
  let csvArray = await GetFileInformation(res);
  //validate*********************************************************************validate*********************
  let temp_array=[...csvArray.resultData];
  //ADD info to each row of the table
  switch(req.body.Route){
    case 'Area':
      temp_array.forEach(function (element) {
        element.Area = true;
      });
      break;
    case 'Train':
      temp_array.forEach(function (element) {
        element.Train = true;
      });
      break;
    case 'Both':
      temp_array.forEach(function (element) {
        element.Area = true;
        element.Train = true;
      });
      break;
    case 'Express':
      temp_array.forEach(function (element) {
        element.Express = true;
      });
      break;
    default:
      break;
  }

  temp_array.forEach(function (element) {
    
    for (var key of Object.keys(req.body.daysAffected)) {
      if(req.body.daysAffected[key]==='on')
      {
        element[key]=true;
      }
    }
  });

  console.log(temp_array);

  //remove all records with day={daysAffected} && route={route}
  updateConflicts(req.body.Route, req.body.daysAffected);
  //update Database with information
//** */  await updateDatabase(csvArray);

  res.status(200).send({receipt:"good"})
  res.end();

  //compress database
}

//process file
const processCSV = function(){
  return new Promise((resolve, reject)=>{
    var filePath = './routes/temp_uploads/' + filenum;
    fs.readFile(filePath, function (err,data) {
      if (err) {
        reject(err);
      }
      var result = data.toString().replace(/[\u200B-\u200D\uFEFF]/g, "");
    
      fs.writeFile(filePath, result, function (err) {
         if (err){
           reject(err)
         };
      });
      resolve();
  })
})}

const updateConflicts = async function(route, daysAffected){
    //find documents based on route
          //out of the found documents find the ones whose days are affected i.e. are true and are 'on' in daysAffected
        //for each date of the documents update the document to show false on that date.
    //there should be one area and one train for each day, it can be same as well.
    

    let listOfConflictedDays=[];
    let listOfConflictedDoc=[]; //contains ID
    let docUpdate = {};
    for (var key of Object.keys(daysAffected)) {
      if(daysAffected[key]==='on')
      {
        listOfConflictedDays.push(key);
        docUpdate[key]=false;
      }
    }

    if(route==='Area')
    {
      await Schedule.find({ 'Area': true },function (err, docs) {
        //for each doc in docs
          //find docs where at least one day in daysAffected is true
            //update the doc with the false in each of the day values
            docs.forEach((doc)=>{
              listOfConflictedDays.forEach((day)=>{
                if(doc[day]===true)
                {console.log(day);
                  if(!(doc._id in listOfConflictedDoc)){
                  listOfConflictedDoc.push(doc._id);
                  }
                }
              });
            });
      });
    }
    else if(route==='Train')
    {
      await Schedule.find({ 'Train': true },function (err, docs) {
        //for each doc in docs
          //find docs where at least one day in daysAffected is true
            //update the doc with the false in each of the day values
            docs.forEach((doc)=>{
              listOfConflictedDays.forEach((day)=>{
                if(doc[day]===true)
                {console.log(day);
                  if(!(doc._id in listOfConflictedDoc)){
                  listOfConflictedDoc.push(doc._id);
                  }
                }
              });
            });
      });
    }
    else if(route==='Both')
    {
      await Schedule.find({ 'Area': true },function (err, docs) {
        //for each doc in docs
          //find docs where at least one day in daysAffected is true
            //update the doc with the false in each of the day values
            docs.forEach((doc)=>{
              listOfConflictedDays.forEach((day)=>{
                if(doc[day]===true)
                {console.log(day);
                  if(!(doc._id in listOfConflictedDoc)){
                  listOfConflictedDoc.push(doc._id);
                  }
                }
              });
            });
      });
      await Schedule.find({ 'Train': true },function (err, docs) {
        //for each doc in docs
          //find docs where at least one day in daysAffected is true
            //update the doc with the false in each of the day values
            docs.forEach((doc)=>{
              listOfConflictedDays.forEach((day)=>{
                if(doc[day]===true)
                {console.log(day);
                  if(!(doc._id in listOfConflictedDoc)){
                  listOfConflictedDoc.push(doc._id);
                  }
                }
              });
            });
      });
    }
    else if(route==='Express')
    {
      await Schedule.find({ 'Express': true },function (err, docs) {
        //for each doc in docs
          //find docs where at least one day in daysAffected is true
            //update the doc with the false in each of the day values
            docs.forEach((doc)=>{
              listOfConflictedDays.forEach((day)=>{
                if(doc[day]===true)
                {console.log(day);
                  if(!(doc._id in listOfConflictedDoc)){
                  listOfConflictedDoc.push(doc._id);
                  }
                }
              });
            });
      });
    }
    else
    {
      console.log("Error: the given route "+route+" was not found");
    }
    let res = await Schedule.updateMany({'_id':{$in: listOfConflictedDoc}},docUpdate);
    console.log("Modified docs = " + res.nModified);
}

const updateDatabase = function(payload, res){
    Schedule.insertMany(payload.resultData)
    .then(function(){ 
      console.log("Data inserted")  // Success 
  })
    .catch(function(error){ 
      console.log(error)      // Failure 
      return res.status(400).send({
        message: 'Error while inserting in database!'
    });
  })
}

//will respond when the database is updated
//this function will take the csv file and update the database with the information from the file
const GetFileInformation = function(res){
  return new Promise((resolve, reject) =>{
    var results = [];
    var filePath = './routes/temp_uploads/' + filenum;
    //creating & reading from stream
    fs.createReadStream(filePath)
    .on('error',() =>{
        console.log('Error with the file path 1 while creating read stream');
        return res.status(400).send({
            message: 'Error with the file path 2 while creating read stream!'
        });
    })
    .pipe(csvParser())
    .on('headers', function (headerList) {
      console.log(headerList)
    })
    .on('data', (data) => {
        results.push(data);
    })
    .on('error',() =>{
        console.log('Error reading data from file');
        return res.status(400).send({
            message: 'Error reading data from file'
         });
    })
    .on('end', () => {
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },  --> row
        //   { NAME: 'Bugs Bunny', AGE: '22' }                      // resposonse that you get
        // ]
        //results is an array of dictionary objects
        resolve({"resultData": results})                                           
    });
  })
}

const compressdatabase = function(){
  //remove unused columns, rows, in the database
}

router.post('/uploadfile', handleUploadedFile);

router.post('/uploadfile/'+filenum, handleFileInformation);

module.exports = router;