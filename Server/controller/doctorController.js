import Doctor from "../Model/Doctor.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Schedule } from "../Model/Schedules.js";
import moment from 'moment'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Doctor.findOne({ email });
       

        if (user) {
            let isValidUser = await bcrypt.compare(password, user.password);
            
            if (isValidUser) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30min' });

                res.cookie(String(user._id), token, {
                    path: "/",
                    expires: new Date(Date.now() + 1000 * 100),
                    httpOnly: true,
                    sameSite: 'lax'
                })

                res.status(201).send({ msg: "Login successfull", userId:user._id, token })
            } else {
                res.status(500).send("invalid credentials")
            }
        } else {
            res.status(404).send("user not found")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "login failed" })

    }
};

export const profile = async(req,res)=>{
    try {
        let doctorId = req.params.id
        console.log(doctorId);
        if(doctorId){
            let doctor = await Doctor.findOne({_id:doctorId});
            if(doctor){
                res.status(201).send(doctor)
            }
        }else{
            res.status(500).json({err:"Un authorized user"});
        }
        
    } catch (error) {
        res.status(500).json({err:"can't get the profile"});
        
    }
}

export const edit = async(req,res)=>{
    try {
        let userId = req.params.id;
        let data = req.body;
        console.log(data);
        let doctors = await Doctor.findByIdAndUpdate(userId,data);
        if(doctors){
            res.status(200).json({success:"doctor data updated successfully"})
        }else{
            res.status(500).json({err:"Doctor Updation failed"});
        }
        
    } catch (error) {
        res.status(500).json({err:"unauthorized user"})
        
    }
}

export const schedule = async(req,res)=>{
    try {
        const {startingTime,endingTime,date,doctorId} = req.body;
        let schedules = [];
        var convertedStartTime = moment(startingTime, 'hh:mm A').format('HH:mm');
        var convertedEndTime = moment(endingTime, 'hh:mm A').format('HH:mm');
        let numStartTime = Number(convertedStartTime.split(':')[0]);
        let numEndTime = Number(convertedEndTime.split(':')[0]);
        console.log(convertedStartTime);

        if(numStartTime < numEndTime){
            for(let i = numStartTime; i < numEndTime; i++){
                schedules.push(i);
            }
        }
        if(numEndTime < numStartTime){
            for(let i = numStartTime; i >= numEndTime; i--){
                schedules.push(i);
            }
        }

        const newSchedule = new Schedule({
            startingTime,
            endingTime,
            date,
            doctorId,
            schedules
        });
        newSchedule.save().then(()=>{
            res.status(200).send({success:"data added successfully"})
        }).catch((err)=>{
            res.status(500).send({err:"can't insert data into database"})
        })
        
    } catch (error) {
        res.status(500).json({err:"can't schedule time"});
        
    }
}

export const scheduledTime = async (req,res)=>{
    try {
        const doctorId = req.params.id;
        const mySchedules = await Schedule.find({doctorId});
        res.status(200).send(mySchedules)
    } catch (error) {
        res.status(500).json({err:"can't find the schedules"})
    }
}


