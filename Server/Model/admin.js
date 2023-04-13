import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter the email address'],
    },
    password:{
        type:String,
        required:[true,'please enter the password'],
        min:[6,'password should contain atleast six characters']
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
});

export const Admin = mongoose.model('Admin',adminSchema);