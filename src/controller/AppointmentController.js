import list from "../model/AppointmentModel.js";
import { format } from 'date-fns';
import crypto from 'crypto';
import Joi from "joi";

const validationSchema = Joi.object({ 
    name: Joi.string().required(), 
    email: Joi.string().email({ tlds: { allow: false } }).required(), 
    birthdate: Joi.string().required(), 
    appointmentDate: Joi.string().required()
  })

class AppointmentController {

    index(request, response) { 
        try{
        response.status(200).send({ list });
        }catch{
        return response.status(400).json({ message: 'Um erro inesperado aconteceu' });
        }
    }
    notAvailable(request, response) { 
        console.log("notAvailable");
        response.status(200).send({ message: "notAvailable" });
    }
    store(request, response) { 
        try{
            const {name, email, birthdate, appointmentDate} = request.body
            const id = crypto.randomUUID();
            const validation = validationSchema.validate(request.body, {abortEarly: false});

            if (validation.error) {
                return response.status(400).json(validation.error.details);
            }

            const appointmentHour = format(new Date(request.body.appointmentDate), 'HH:mm');



            list.push(
                {
                    id, 
                    name, 
                    email, 
                    birthdate: format(new Date(birthdate), 'MM/dd/yyyy'), 
                    appointmentDate: format(new Date(appointmentDate), 'MM/dd/yyyy'), 
                    appointmentHour
                });

            return response.status(201).send({ message: `Agendamento incluido com sucesso` });

        }catch{
            return response.status(400).json({ message: 'Um erro inesperado aconteceu' });
        }
        
        
    }
    update(request, response) { 
        console.log("update");
        response.status(200).send({ message: "update" });
    }

}

export default AppointmentController;     
