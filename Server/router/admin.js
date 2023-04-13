import { Router } from 'express';
import * as controller from '../controller/adminController.js'
import { Auth } from '../Auth/middleware.js';

const router = Router();

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);
router.route('/addDoctor').post(controller.addDoctor);
router.route('/allDoctors').get(controller.getAllDoctors);
router.route('/addDepartment').post(controller.createDepartment);
router.route('/departments').get(controller.getAllDepartments);
router.route('/patients').get(controller.getAllPatients);



export default router;