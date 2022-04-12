import express from "express";
import AppointmentController from "../controller/AppointmentController.js";

const router = express.Router();
const appointmentController = new AppointmentController;

router.get('/api/',appointmentController.index);
router.get('/api/notAvailable', appointmentController.notAvailable);
router.post('/api/', appointmentController.store);
router.put('/api/:id', appointmentController.update);

export default router;