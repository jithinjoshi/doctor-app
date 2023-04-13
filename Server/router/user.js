import express from 'express'
const router = express.Router();
import { Auth, refreshToken} from '../Auth/middleware.js';

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


export default router; 