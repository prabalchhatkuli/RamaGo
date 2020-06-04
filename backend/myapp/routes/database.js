var express = require('express');
var router = express.Router();
var csvParser = require('csv-parser');
var fs = require('fs');


var getDataByDay = function(day){
    return new Promise((resolve, reject) =>{
    var results = [];
    var filePath = './public/csv/' + day + '.csv';
    console.log(filePath);
    //creating & reading from stream
    fs.createReadStream(filePath)
    .on('error',() =>{
        console.log('Error with the file path while creating read stream');
        return res.status(400).send({
            message: 'Error with the file path while creating read stream!'
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
    });
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
        var dayResult = await getDataByDay(req.body.day);
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

//needs day field sent to server
router.get('/displayByDay', getDataByDay);

//needs time field always accompanied by day field  --> gets day data --> processes day data according to time --> for view -> list of destinations at or after that time
//     + 1) with dest field --> gets above--> processes the next available time/s to that destination
router.get('/displayByTime', getDataByTime);

//needs destination field --> give the next available times to go to a certain destination
//      1) with day field 
//      2) with time field
router.post('/displayByDestination',getDataByDestAndTime);

module.exports = router;