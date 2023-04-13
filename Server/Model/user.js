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
    }
});

export default mongoose.model('User',userSchema);