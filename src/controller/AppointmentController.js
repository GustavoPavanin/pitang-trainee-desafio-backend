class AppointmentController {

    index(request, response) { 
        response.status(200).send({ message: "index" });
    }
    notAvailable(request, response) { 
        console.log("notAvailable");
        response.status(200).send({ message: "notAvailable" });
    }
    store(request, response) { 
        console.log("store");
        response.status(200).send({ message: "store" });
    }
    update(request, response) { 
        console.log("update");
        response.status(200).send({ message: "update" });
    }

}

export default AppointmentController;

