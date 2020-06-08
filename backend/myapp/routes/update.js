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
  //reads all rows from the csv and parses it into this array
  let csvArray = await GetFileInformation(res);
  //update Database with information

  console.log(csvArray);

  res.status(200).send({receipt:"good"})

  res.end();

  //compress database
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