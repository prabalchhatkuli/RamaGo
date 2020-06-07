var express = require('express');
var router = express.Router();
const formidable = require('formidable');
var csvParser = require('csv-parser');
//model of the schema
let Schedule = require('../models/schedule.model');

var waitforfileInformation = false;
var filenum = 1234;

//uploaded file needs to be processed and stored in a database
var handleUploadedFile = async function(req, res, next){
    const form = formidable({ multiples: true });

    form.parse(req);

    form.on('fileBegin', function(name, file){
      //change this to appropriate file system************************************************remember to change***********

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


var handleFileInformation = function(req, res, next){
  //take the information from request validate information and pass to updateDatabase
  //updateDatabase(req, res, next),
  console.log(req.body);

  res.send(info);

  res.end();
}

//will respond when the database is updated
const updateDatabase = function(req, res, next){



  //once this is completed call the res.end() function
  //then call the managedatabase() function which will remove empty rows, empty columns, etc
}

const managedatabase = function(){

}

router.post('/uploadfile', handleUploadedFile);

router.post('/uploadfile/'+filenum, handleFileInformation);

module.exports = router;