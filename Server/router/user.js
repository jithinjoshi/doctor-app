import express from 'express'
const router = express.Router();
import { Auth, checkIsBlocked, refreshToken} from '../Auth/middleware.js';

import * as controller from '../controller/userController.js'

//post
router.route('/register').post(controller.register);
router.route('/register-with-google').get(controller.googleRegister);
router.route('/login-with-google').get(controller.googleLogin)
router.route('/login').post(controller.login);
router.route("/user").get(Auth,controller.getUser);
router.route("/refresh").get(refreshToken,Auth,controller.getUser);
router.route('/doctors').get(controller.getAllDoctors);
router.route('/availableSlots/:id').get(controller.getDoctorAvailability);
router.route('/signout').post(Auth,controller.signoutUser);
router.route('/doctor/:id').get(controller.getSingleDoctor);
router.route('/doctor/appointment').post(controller.appointment);
// router.route('/doctor/timings').post(controller.manageTimings);
// router.route('/doctor/updateTimings').put(controller.updateTimings);
router.route('/doctor/checkAvailability').post(controller.checkAvailability);
router.route('/payment').post(controller.payment);

router.route('/login-with-otp').post(controller.loginWithOtp);
router.route('/forgot-password').post(controller.forgotPassword);
router.route('/reset-password/:id/:token').post(controller.resetPassword);


export default router; 