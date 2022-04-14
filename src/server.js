import express from "express";
import Router from "./router/AppointmentRouter.js";
import detEnv from 'dotenv';
import cors from 'cors';
detEnv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.get("/", (request, response) => response.json({message: "Appointment..."}))
app.use(cors());
app.use(Router);


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} ----- Aplicação Iniciada`);
});


