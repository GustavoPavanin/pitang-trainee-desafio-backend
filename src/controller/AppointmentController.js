import list from "../model/AppointmentModel.js";
import { format } from 'date-fns';
import crypto from 'crypto';
import validationSchema from "../validation/postValidationSchema.js";
import putValidationSchema from "../validation/putValidationSchema.js";
import businessRules from "../validation/businessRules.js";
import dataSort from "../validation/dataSort.js";
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
                return response.status(400).json("Um erro inesperado aconteceu, verifique os dados enviados.");
            }
            const {name, email} = request.body
            const id = crypto.randomUUID();
            const birthdate = format(new Date(request.body.birthdate), 'MM/dd/yyyy');
            const appointmentDate = format(new Date(request.body.appointmentDate), 'MM/dd/yyyy');
            const appointmentHour = format(new Date(request.body.appointmentHour), 'HH:mm');

            const data =  {id, name, email, birthdate, appointmentDate, appointmentHour, status: false, conclusion: ""}

            if(businessRules(appointmentDate, appointmentHour)){
                list.push( data );

                dataSort(appointmentDate, appointmentHour);

                return response.status(201).send({ message: `Agendamento incluido com sucesso`, data });
            }

            return response.status(401).json({ message: 'Voce nao pode fazer esse agendamento' });

        }catch{
            return response.status(400).json({ message: 'Um erro inesperado aconteceu' });
        }

    }

    update(request, response) { 
        const { id } =request.params;
        const { comment } = request.body
        const position = list.findIndex(object => { return object.id === id;});
        const validation = putValidationSchema.validate(request.body, {abortEarly: false});
            if (validation.error) {
                return response.status(400).json(validation.error.details);
            }

        if (position < 0) {
            return response.status(400).send({ message: 'Agendamento não encontrado.' });
        }

        list[position].status = true;
        list[position].conclusion = comment;

        return response.status(200).send({ message: "Agendamento atualizado com sucesso" });
    }

}

export default AppointmentController;     
