const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    //this schema will contain all the possible destinations in the csv file
        Campus:{type: String},
        Ramsey: {type: String},
        ArriveCampus: {type: String}
    },
    {
        timestamps:true
    }
)

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;