import list from "../model/AppointmentModel.js";

const dataSort = () => {
    list.sort((a, b) => {
        if(a.appointmentDate < b.appointmentDate) return -1;
        if(a.appointmentDate > b.appointmentDate) return 1;
        if(a.appointmentDate == b.appointmentDate) {
            if(a.appointmentHour < b.appointmentHour) return -1;
            if(a.appointmentHour > b.appointmentHour) return 1;
            if(a.appointmentHour == b.appointmentHour) return 0;
        }
    });
}

export default dataSort;