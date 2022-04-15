import list from "../model/AppointmentModel.js";
import { format, formatISO } from 'date-fns';
import crypto from 'crypto';
import Joi from "joi";

const validationSchema = Joi.object({ 
    name: Joi.string().required(), 
    email: Joi.string().email({ tlds: { allow: false } }).required(), 
    birthdate: Joi.string().required(), 
    appointmentDate: Joi.string().required()
  })

const businessRules = (appointmentDate, appointmentHour) => {
    //list.find()
    if(list.filter(list => list.appointmentDate == appointmentDate).length >= 20){
        return false;
    }
    if((list.filter((list) => { return(list.appointmentDate == appointmentDate && list.appointmentHour == appointmentHour) })).length >= 2) {
        return false;
    }

    return true;
}

const dataSort = () => {
    list.sort((a, b) => {
        if(a.appointmentDate < b.appointmentDate) return -1;
        if(a.appointmentDate > b.appointmentDate) return 1;
        if(a.appointmentDate = b.appointmentDate) {
            if(a.appointmentHour < b.appointmentHour) return -1;
            if(a.appointmentHour > b.appointmentHour) return 1;
            if(a.appointmentHour = b.appointmentHour) return 0;
        }
    });
}

class AppointmentController {

    index(request, response) { 
        try{
        response.status(200).send({ list });
        }catch{
        return response.status(400).json({ message: 'Um erro inesperado aconteceu' });
        }
    }

    notAvailable(request, response) { 
        const notAvailableDateList = list.filter((data, index, list) => {
                if(list.filter(list => data.appointmentDate == list.appointmentDate).length >= 20){
                    return true;
                }
                return false;
            });
        const notAvailableDates = [];

        notAvailableDateList.forEach((objDate) => {
            let duplicated  = notAvailableDates.findIndex(date => {
                return new Date(objDate.appointmentDate).getTime() === date.getTime();
            }) > -1;
        
            if(!duplicated) {
                notAvailableDates.push(new Date(objDate.appointmentDate));
            }
        });

        response.status(200).send({ notAvailableDates });
    }

    store(request, response) { 
        try{
            const validation = validationSchema.validate(request.body, {abortEarly: false});
            if (validation.error) {
                return response.status(400).json(validation.error.details);
            }
            const {name, email} = request.body
            const id = crypto.randomUUID();
            const birthdate = format(new Date(request.body.birthdate), 'MM/dd/yyyy');
            const appointmentDate = format(new Date(request.body.appointmentDate), 'MM/dd/yyyy');
            const appointmentHour = format(new Date(request.body.appointmentDate.replace("Z","")), 'HH:mm');

            if(businessRules(appointmentDate, appointmentHour)){
                list.push(
                    {
                        id, 
                        name, 
                        email, 
                        birthdate, 
                        appointmentDate, 
                        appointmentHour,
                        status: false,
                        conclusion: ""
                    });

                dataSort(appointmentDate, appointmentHour);

                return response.status(201).send({ message: `Agendamento incluido com sucesso` });
            }

            return response.status(401).json({ message: 'Voce nao pode fazer esse agendamento' });

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
