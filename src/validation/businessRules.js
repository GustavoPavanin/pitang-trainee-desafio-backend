import list from "../model/AppointmentModel.js";

const businessRules = (appointmentDate, appointmentHour) => {

    if(new Date(appointmentDate) < new Date()){
        return false;
    }
    if(appointmentHour.substring(3) != "00"){
        return false;
    }

    if(list.filter(list => list.appointmentDate == appointmentDate).length >= 20){
        return false;
    }
    if((list.filter((list) => { return(list.appointmentDate == appointmentDate && list.appointmentHour == appointmentHour) })).length >= 2) {
        return false;
    }

    return true;
}

export default businessRules;