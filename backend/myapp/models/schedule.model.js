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
        "Area":{type: Boolean,default: 'false'},
        "Train":{type: Boolean,default: 'false'},
        "Express":{type: Boolean,default: 'false'},
        "Sunday":{type: Boolean,default: 'false'},
        "Monday":{type: Boolean,default: 'false'},
        "Tuesday":{type: Boolean,default: 'false'},
        "Wednesday":{type: Boolean,default: 'false'},
        "Thursday":{type: Boolean,default: 'false'},
        "Friday":{type: Boolean,default: 'false'},
        "Saturday":{type: Boolean,default: 'false'}
        
    },
    {
        timestamps:true
    }
)

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
