const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const singleSchedule = new Schema({
//     "ListOfStops":[String],
//     "Schedule":{}
// })

// const typeofSchedule = new Schema({
//     "AreaSchedule":[singleSchedule],
//     "TrainSchedule":[singleSchedule],
//     "Both":[singleSchedule],
//     "GardenState":[singleSchedule]
// })

// const scheduleSchema = new Schema({
//     //this schema will contain all the possible destinations in the csv file

//         "Sunday":[typeofSchedule],
//         "Monday":[typeofSchedule],
//         "Tuesday":[typeofSchedule],
//         "Wednesday":[typeofSchedule],
//         "Thursday":[typeofSchedule],
//         "Friday":[typeofSchedule],
//         "Saturday":[typeofSchedule]
        
//     },
//     {
//         timestamps:true
//     }
// )

const scheduleSchema = new Schema({
    //this schema will contain all the possible destinations in the csv file
        "Leave Campus":{type: String,default: '-'},
        "Ramsey 17 I":{type: String,default: '-'},
        "Interstate":{type: String,default: '-'},
        "Ramsey Farmers Market":{type: String,default: '-'},
        "Palisades Mall":{type: String,default: '-'},
        "Waldwick Medical":{type: String,default: '-'},
        "UG/Houlihans":{type: String,default: '-'},
        "Shannon Rose":{type: String,default: '-'},
        "Stateline":{type: String,default: '-'},
        "M/B":{type: String,default: '-'},
        "CPA":{type: String,default: '-'},
        "Overlook":{type: String,default: '-'},
        "Laurel Deck":{type: String,default: '-'},
        "Village Lot":{type: String,default: '-'},
        "Bus Stop":{type: String,default: '-'},
        "Ramsey 17 II":{type: String,default: '-'},
        "Garden State Mall":{type: String,default: '-'},
        "Area Shuttle":{type: Boolean,default: 'true'},
        "Train Shuttle":{type: Boolean,default: 'true'},
        "Gardenstate":{type: Boolean,default: 'true'},
        "Sunday":{type: Boolean,default: 'true'},
        "Monday":{type: Boolean,default: 'true'},
        "Tuesday":{type: Boolean,default: 'true'},
        "Wednesday":{type: Boolean,default: 'true'},
        "Thursday":{type: Boolean,default: 'true'},
        "Friday":{type: Boolean,default: 'true'},
        "Saturday":{type: Boolean,default: 'true'}
        
    },
    {
        timestamps:true
    }
)

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
