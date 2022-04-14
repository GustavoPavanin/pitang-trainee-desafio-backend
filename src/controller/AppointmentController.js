import list from "../model/AppointmentModel.js";
import { format } from 'date-fns';
import crypto from 'crypto';
import Joi from "joi";

const schema = Joi.object({ 
    name: Joi.string().required(), 
    email: Joi.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
    birthdate: Joi.date().required().max(new Date()), 
    appointmentDate: Joi.date().required(), 
    appointmentHour,
    languages: Joi.array().items(Joi.string()),
    director: Joi.string().required().min(3).max(50),
    rating: Joi.number().max(10),
    duration: Joi.number().integer().positive().max(500),
    thumbnail: Joi.string().allow(''),
    description: Joi.string().required().max(10000)
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
        /*{
        "name": "Gustavo Pavanin Martins",
        "email": "gustavo_pavanin@hotmail.com",
        "birthdate": "2022-03-16T23:08:38.000Z",
        "appointmentDate": "2022-04-23T23:30:00.000Z"
        }*/
        try{
            const {name, email} = request.body
            const id = crypto.randomUUID();
            const birthdate = format(new Date(request.body.birthdate), 'MM/dd/yyyy');
            const appointmentDate = format(new Date(request.body.appointmentDate), 'MM/dd/yyyy');
            const appointmentHour = format(new Date(request.body.appointmentDate), 'HH:mm');
            list.push({id, name, email, birthdate, appointmentDate, appointmentHour});

            return response.status(201).send({ message: `Agendamento incruido com sucesso` });

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
