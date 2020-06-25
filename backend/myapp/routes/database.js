var express = require('express');
var router = express.Router();
var csvParser = require('csv-parser');
var fs = require('fs');
const Schedule = require('../models/schedule.model');


var getDataByDay = function(req,res, next){
    console.log(req.body);
};


var getDataByTime = function(req, res, next){
    
};

function compareTime(str1, str2)
{
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if(eval(time1[0]) > eval(time2[0])||eval(time2[0]==12)){
        return false;
    } else if(eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return false;
    } else {
        return true;
    }
}

var getDataByDestAndTime = async function(req, res, next){
    //get the whole json for that day
    var dayResult;
    try
    {
        dayResult = await getDataByDay(req.body.day, res);
        console.log(dayResult);
        //process json according to origin and destination
        var newArray = dayResult["resultData"].filter(function (el) {
            if(el[req.body.origin] != '-' && el[req.body.dest] != '-')
            {
                console.log(el[req.body.dest]);
                console.log(req.body.dest);
                var dataTime = el[req.body.origin].split(" ");
                console.log("Entered split at least once");
                var reqTime = (req.body.time).split(" ");
                if(dataTime.length !==2 || reqTime.length !==2)
                {
                    console.log("Error processing file - error in reading time format");
                }
                if((reqTime[1] == 'AM' && dataTime[1] == 'PM')) return true;
                if((reqTime[1] == 'PM' && dataTime[1] == 'PM')){
                    if(reqTime[0] === dataTime[0]){
                        return true;
                    }
                    else
                    {
                        return compareTime(reqTime[0], dataTime[0]);
                    }
                }
            }
            else
            {
                return false;
            }
        //return true or false
        });
    //process the result json according to the given time

    //return response
        res.send(newArray);

    }
    catch(error)
    {
        console.error(error);
    }
    
};


var getDataByQuery = async function(req, res, next){
    //req.body in the form { origin: 'Ramapo', dest: 'Select', time: '8:54 PM', day: 'Tuesday' }
    //validate input
    //getDataByQuerying the database
    //query for documents that have the origin, dest not '-', and that have the given date true
    //need to verify time so that proper time can be taken from the record
    if(req.body.origin==='Ramapo'){
        req.body.origin='Leave Campus'
    }
    let initialDocList = await Schedule.find({ [req.body.origin]: {$ne: "-"}, [req.body.dest]: {$ne: "-"}, [req.body.day]: true});

    //filter based on time on origin 
    //***************************************************************************GIve this to client */
    let filteredList=initialDocList.filter(function(each){
        console.log(each[req.body.origin]);
        console.log(req.body.time);
        let dataTime = (each[req.body.origin]).split(" ");
        let reqTime = (req.body.time).split(" ");
        if(dataTime.length !==2 || reqTime.length !==2)
        {
            console.log("Error processing file - error in reading time format");
        }
        if((reqTime[1].toLowerCase() === 'am' && dataTime[1].toLowerCase() === 'pm')) return true;
        if((reqTime[1].toLowerCase() === 'pm' && dataTime[1].toLowerCase() === 'pm')){
            if(reqTime[0] === dataTime[0]){
                return true;
            }
            else
            {
                return compareTime(reqTime[0], dataTime[0]);
            }
        }
        else
        {
            return false;
        }
    })
    //***************************************************************************Give this to client to handle */
    res.send(filteredList);

}
//needs day field sent to server
router.post('/displayByDay', getDataByDay);

//needs time field always accompanied by day field  --> gets day data --> processes day data according to time --> for view -> list of destinations at or after that time
//     + 1) with dest field --> gets above--> processes the next available time/s to that destination
router.get('/displayByTime', getDataByTime);

//needs destination field --> give the next available times to go to a certain destination
//      1) with day field 
//      2) with time field
router.post('/displayByDestination',getDataByDestAndTime);

router.post('/displayByQuery',getDataByQuery);

module.exports = router;