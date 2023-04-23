import mongoose from "mongoose";

const timingSchema = new mongoose.Schema({
    doctorId : {
        type:mongoose.Types.ObjectId
    },
    timings : {
        type:Array
    },
    date : {
        type:Date
    }
},{timestamps:true});

export const Timing = mongoose.model('Timing',timingSchema);