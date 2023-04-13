import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    startingTime : {
        type:String,
    },
    endingTime : {
        type: String
    },
    date:{
        type:Date
    },
    doctorId:{
        type:mongoose.Types.ObjectId
    },
    schedules:{
        type:Array
    }
})

export const Schedule = mongoose.model('Schedule',scheduleSchema)