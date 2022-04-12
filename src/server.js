import express from "express";
import Router from "./router/AppointmentRouter.js";
import AppointmentController from "./controller/AppointmentController.js";
import detEnv from 'dotenv';

detEnv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());


app.get("/", (request, response) => response.json({message: "Appointment..."}))

app.use(Router);


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} ----- Aplicação Iniciada`);
});


