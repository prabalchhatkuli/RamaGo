const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleSchedule = new Schema({
    "ListOfStops":[String],
    "Schedule":{}
})

const typeofSchedule = new Schema({
    "AreaSchedule":[singleSchedule],
    "TrainSchedule":[singleSchedule],
    "Both":[singleSchedule],
    "GardenState":[singleSchedule]
})

const scheduleSchema = new Schema({
    //this schema will contain all the possible destinations in the csv file

        "Sunday":[typeofSchedule],
        "Monday":[typeofSchedule],
        "Tuesday":[typeofSchedule],
        "Wednesday":[typeofSchedule],
        "Thursday":[typeofSchedule],
        "Friday":[typeofSchedule],
        "Saturday":[typeofSchedule]
        
    },
    {
        timestamps:true
    }
)

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;


// "Leave Campus":{type: String,default: '-'},
        // "Ramsey 17":{type: String,default: '-'},
        // "Interstate":{type: String,default: '-'},
        // "Ramsey Farmers Market":{type: String,default: '-'},
        // "Palisades Mall":{type: String,default: '-'},
        // "Waldwick Medical":{type: String,default: '-'},
        // "UG/Houlihans":{type: String,default: '-'},
        // "Shannon Rose":{type: String,default: '-'},
        // "Ramsey 17":{type: String,default: '-'},
        // "Stateline":{type: String,default: '-'},
        // "M/B":{type: String,default: '-'},
        // "CPA":{type: String,default: '-'},
        // "Overlook":{type: String,default: '-'},
        // "Laurel Deck":{type: String,default: '-'},
        // "Village Lot":{type: String,default: '-'},
        // "Bus Stop":{type: String,default: '-'},
        // "Area Shuttle":{type: bool,default: 'true'},
        // "Train Shuttle":{type: bool,default: 'true'},
        // "Sunday":{type: bool,default: 'true'},
        // "Monday":{type: bool,default: 'true'},
        // "Tuesday":{type: bool,default: 'true'},
        // "Wednesday":{type: bool,default: 'true'},
        // "Thursday":{type: bool,default: 'true'},
        // "Friday":{type: bool,default: 'true'},
        // "Saturday":{type: bool,default: 'true'},