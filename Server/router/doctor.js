import express from 'express';
import * as controller from '../controller/doctorController.js'
import { Auth } from '../Auth/middleware.js';

const router = express.Router();

router.route('/signin').post(controller.login);
router.route('/profile/:id').get(controller.profile);
router.route('/edit/:id').put(controller.edit);
router.route('/schedule/:id').post(controller.schedule);
router.route('/scheduledTime/:id').get(controller.scheduledTime);

export default router