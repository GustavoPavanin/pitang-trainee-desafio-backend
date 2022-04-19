import express from "express";
import AppointmentController from "../controller/AppointmentController.js";

const router = express.Router();
const appointmentController = new AppointmentController;

router.get("/", (request, response) => response.json({message: "COVID vaccination schedule"}))
router.get('/api/',appointmentController.index);
router.get('/api/notAvailable', appointmentController.notAvailable);
router.post('/api/', appointmentController.store);
router.put('/api/:id', appointmentController.update);

export default router;