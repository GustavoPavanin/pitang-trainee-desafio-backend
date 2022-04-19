import express from "express";
import Router from "./router/AppointmentRouter.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(Router);

export default app;


