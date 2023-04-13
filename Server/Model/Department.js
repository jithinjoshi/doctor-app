import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    department:{
        type:String,
        unique:[true,"This department is already exist"],
        required:[true,"department should add"]
    }
})

export const Department = mongoose.model('Department',departmentSchema);