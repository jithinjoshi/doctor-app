import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        min :[4,'username should contain atleast four characters'],
        max: [20,'maximum length of username is exceeded'],
        required:[true,'please provide username']
    },
    email: {
        type: String,
        unique:true,
        required:[true,'please provid a  username'],
    },
    password:{
        type:String,
        unique:false,
        //required:[true,'please provide a password'],
        min:[6,"password atleast contain six characters"]
    },
    mobile:{
        type:Number,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
});


export const User = mongoose.model('User',userSchema)
