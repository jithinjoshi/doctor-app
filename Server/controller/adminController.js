import bcrypt, { hash } from 'bcrypt';
import { Admin } from '../Model/admin.js';
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js';
import Doctor from '../Model/Doctor.js';
import { Department } from '../Model/Department.js';
import User from '../Model/User.js';


//admin signup
export const signup = (async (req,res)=>{
    try {
        const {email,password} = req.body;


        if(email && hash){
            const hash = await bcrypt.hash(password,10);
            const adminSignIn = new Admin({
                email:email,
                password:hash
            });
            adminSignIn.save().then(()=>{
                res.status(201).send({success:"admin registered successfully"});
            }).catch((err)=>{
                res.status(404).send({err:"admin registration failure"})
            })

        }else{
            return res.status(500).send({err:'invalid credentials'})
        }

        
    } catch (error) {
        res.status(500).send({err:error})
        
    }
})


//admin signin
export const signin = (async(req,res)=>{
    try {
        const {email,password} = req.body;
        let admin = await Admin.findOne({email});

        if(admin){
            const compare = await bcrypt.compare(password,admin.password);
            console.log(compare);
            if(compare){
                const token = jwt.sign({userId:admin._id,isAdmin:admin.isAdmin},process.env.JWT_SECRET,{expiresIn:'30min'});
                console.log(token);

                res.cookie(String(admin._id),token,{
                    path:"/",
                    expires:new Date(Date.now()+1000 * 30),
                    httpOnly:true,
                    sameSite:'lax'
                })
                res.status(201).send({msg:"Login successfull",username:admin.email,token})
            }else{
                console.log("error ");
                res.status(500).send({err:'invalid credentials'}); 
            }
        }
    } catch (error) {
        console.log("error....");
        return res.status(500).send({err:error})
    }
});


//create doctors
export const addDoctor = (async(req,res)=>{
    try {
        const {firstName,lastName,mobile,dob,email,department,address,password,image} = req.body;
        
        const hash = await bcrypt.hash(password,10);

        if(image){
           const uploadRes =  await cloudinary.uploader.upload(image,{
                upload_preset:'webDoc'
            })

            if(uploadRes){
                const addNewDoctor = new Doctor({
                    firstName,
                    lastName,
                    mobile,
                    dob,
                    email,
                    department,
                    address,
                    password:hash,
                    image:uploadRes
                });

                addNewDoctor.save().then(()=>{
                    console.log("data added");
                    res.status(200).send({success:"doctor added successfully"});
                }).catch((err)=>{
                    console.log(err);
                    res.status(500).send({err:"something went wrong"})
                })
                
            }else{
                console.log("something wrong");
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({err:"Adding doctor failed"})
    }
})


//get all doctors
export const getAllDoctors = (async(req,res)=>{
    try {
        const allDoctors = await Doctor.find({});
        console.log(allDoctors);
        res.status(200).json({data:allDoctors})
    } catch (error) {
        console.log(error);
        return res.status(500).json({err:"cant find doctors"})
        
    }

});


//create department
export const createDepartment = async(req,res)=>{
    try {
        const {department} = req.body;
        const lowercaseDepartment = department.trim().toLowerCase();
        const checkDepartment = await Department.findOne({lowercaseDepartment});

        if(!checkDepartment){
            const newDepartment = new Department({
                department:lowercaseDepartment
            });
            newDepartment.save().then(()=>{
                console.log("successfully added the department");
                res.status(200).json({success:"department added"})
            }).catch((err)=>{
                console.log(err);
                res.status(500).json({err:"can't add department"})
            })
        }else{
            res.status(500).json({err:"department is already exist"});
        }
        
    } catch (error) {
        res.status(500).json({err:"can't create department"});
    }
}


//get all departments
export const getAllDepartments = async(req,res) => {
    try {
        const departments = await Department.find({});

        if(departments){
            res.status(201).send(departments);
        }else{
            res.status(500).send({err:"something wrong"})
        }
        
    } catch (error) {
        res.status(500).json({err:"can't get departments"})        
    }
};

//get all patients
export const getAllPatients = async (req,res)=>{
    try {
        const patients = await User.find({});
        res.status(201).send(patients);
        
        
    } catch (error) {
        res.status(500).json({err:"can't get the patients"});
    }
}


