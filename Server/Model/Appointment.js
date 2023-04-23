import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Types.ObjectId
    },
    doctorId : {
        type : mongoose.Types.ObjectId
    },
    doctorInfo :{
        type : Array
    },
    userInfo : {
        type: Array
    },
    date : {
        type:Date
    },
    time : {
        type:String
    },
    status:{
        type:String,
        default:'pending'
    }
},
{ timestamps: true }
);

export const Appointment = mongoose.model('Appointment',appointmentSchema);