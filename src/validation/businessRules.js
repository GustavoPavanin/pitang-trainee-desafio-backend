import list from "../model/AppointmentModel.js";

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

export default businessRules;