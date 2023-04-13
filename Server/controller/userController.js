import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import admin from '../config/firebase.config.js';

import User from '../Model/User.js';
import Doctor from '../Model/Doctor.js';
import { Schedule } from '../Model/Schedules.js';



//register
export const register = async (req, res) => {
    try {

        const { username, email, password } = req.body;


        const checkUsername = new Promise((resolve, reject) => {
            if (!username || username?.length < 4) {
                reject(new Error('invalid username'))

            } else {
                resolve();
            }
        });

        const checkEmail = new Promise((resolve, reject) => {
            User.findOne({ email }).then(user => {
                if (user) {
                    reject(new Error('emaill is already exist'))
                } else {
                    resolve();
                }

            })
        })



        Promise.all([checkUsername, checkEmail]).then(() => {
            if (password) {
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        console.log("pass err", err);
                        return res.status(500).json({ err: err })
                    }
                    const newUser = new User({
                        username,
                        email,
                        password: hash
                    })

                    newUser.save().then((user) => {
                        res.status(201).json({ success: "registration successfull" })
                    })

                })

            }
        }).catch((error) => {
            res.status(500).json({ err: error })
        })

    } catch (error) {
        res.status(500).send(error)

    }
}

//register with google

const newUserData = async (decodeValue, req, res) => {
    const newUser = new User({
        username: decodeValue.name,
        email: decodeValue.email,
    })

    try {
        const saveUser = await newUser.save();
        res.status(201).send({ user: saveUser })
    } catch (error) {
        res.status(400).send({ success: false, msg: error })

    }
}

const updateUserData = async (decodeValue, req, res) => {
    const filter = { userId: decodeValue.email };
    const options = {
        upsert: true,
        new: true
    };
    try {
        const result = await User.findOneAndUpdate(
            filter,
            options
        );
        res.status(200).send({ user: result })
    } catch (error) {

    }
}


//google signup
export const googleRegister = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(500).send({ message: "invalid token" })
        }

        const token = req.headers.authorization.split(" ")[1];

        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (!decodeValue) {
                return res.status(500).json({ success: false, message: "unauthorized user" })
            }

            //check the user existence
            const userExist = await User.findOne({ email: decodeValue.email });
            if (!userExist) {
                newUserData(decodeValue, req, res)
            } else {
                updateUserData(decodeValue, req, res);

            }
        } catch (error) {
            return res.status(500).send({ success: false, msg: error })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

//google login
export const googleLogin = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(500).send({ message: "invalid token" })
        }

        const token = req.headers.authorization.split(" ")[1];

        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (!decodeValue) {
                return res.status(500).json({ success: false, message: "unauthorized user" })
            }

            //check the user existence
            const userExist = await User.findOne({ email: decodeValue.email });
            if (!userExist) {
                res.status(500).json({ err: "no user with this email address" })
            } else {
                res.status(200).json({ success: "successfully logged in" })

            }
        } catch (error) {
            return res.status(500).send({ success: false, msg: error })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}


//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            let isValidUser = await bcrypt.compare(password, user.password);
            if (isValidUser) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30min' });
                console.log(user._id);

                if (req.cookies[user._id]) {
                    req.cookies[user._id]
                }

                res.cookie(String(user._id), token, {
                    path: "/",
                    expires: new Date(Date.now() + 1000 * 30),
                    httpOnly: true,
                    sameSite: 'lax'
                })

                res.status(201).send({ msg: "Login successfull", username: user.username, token })
            } else {
                res.status(500).send("invalid credentials")
            }
        } else {
            res.status(404).send("user not found")
        }

    } catch (error) {
        res.status(500).send(error)

    }
}

//get user
export const getUser = async (req, res,) => {
    const userId = req.user.userId;
    try {

        let user = await User.findById(userId);

        if (user) {
            console.log(user);
            let { password, ...rest } = Object.assign({}, user.toJSON());
            res.status(201).send(rest);
            console.log(rest);
        } else {
            res.status(500).send("can't find the user")
        }

    } catch (error) {
        res.status(500).send("not authorized")
    }

}

//get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        let doctors = await Doctor.find({},'-password');
        res.status(200).send(doctors);

    } catch (error) {
        res.status(500).json({ err: "can't get all doctors" })

    }
}

//get a doctor availability
export const getDoctorAvailability = async(req,res)=>{
    try {
        const {id} = req.params;
        const schedules = await Schedule.find({doctorId:id});
        if(schedules){
            return res.status(200).send(schedules);
        }else{
            res.status(500).json({err:"schedules not found"})
        }
        
    } catch (error) {
        res.status(500).json({err:"can't get doctor availability"})
        
    }
}

//signout user
export const signoutUser = async (req, res) => {
    try {
        const cookies = req.headers.cookie
        const prevToken = cookies.split("=")[1];

        if (!prevToken) {
            return res.status(400).json({ message: "couldn't find the token" });
        }
        jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(403).json({ msg: "Authentication failed" })
            }
            res.clearCookie(`${decoded.userId}`);
            req.cookies[`${decoded.userId}`] = "";
        });
        res.status(201).json({success:"user signout successfully"})

    } catch (error) {
        res.status(500).json({ err: "unable to logout user" });

    }
}