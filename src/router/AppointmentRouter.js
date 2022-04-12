import express from "express";

const appointmentController = new appointmentController;
const router = express.Router();

router.get('/api/',appointmentController.index);
router.get('/api/notAvailable', appointmentController.notAvailable);
router.post('/api/', appointmentController.store);
router.put('/api/:id', appointmentController.update);

export default router;