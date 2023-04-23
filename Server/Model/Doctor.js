import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstname is mandatory"],
        min: [3, "firstname should contain atleast three characters"]
    },
    lastName: {
        type: String,
    },
    mobile: {
        type: Number,
        required: [true, "mobile number is required"],
        unique: [true, "mobile number is already exist"],
        min: [10, "mobile number should contain 10 digits"]
    },
    email: {
        type: String,
        unique: [true, "email should be unique"],
        required: [true, "email is required"]
    },
    department: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: [true, "dob is required"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        min: [6, "password must contain 6 characters"]
    },
    image: {
        type: Object,
        required: [true, "please add the image"]
    },
    about: {
        type:String
    },
    experience:{
        type:Number,
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    timings : {
        type:Array
    },
    fees : {
        type:Number
    },
    deleted:{
        type:Boolean,
        default:false
    }
});

export default mongoose.model('Doctor', doctorSchema);