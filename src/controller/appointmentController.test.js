import request from "supertest";
import app from "../app";
import list from "../model/AppointmentModel.js";

const resetList = () => {
    list.length = 0;
}

describe("test GET /api/", () => {

    test("Should return 200 and a list in your body on get appointments", async () => {
        const appointmentList = await request(app).get("/api/");
        expect(appointmentList.statusCode).toBe(200);
        expect(appointmentList.body).toHaveProperty("list");
    });

    test("Should return 404 on get with wrong URL", async () => {
        const appointmentList = await request(app).get("/test/");
        expect(appointmentList.statusCode).toBe(404);
    });

});

describe("test GET /api/notAvailable", () => {

    test("Should return 200 and a list in your body on get appointments", async () => {
        const appointmentList = await request(app).get("/api/notAvailable");
        expect(appointmentList.statusCode).toBe(200);
        expect(appointmentList.body).toHaveProperty("notAvailableDates");
    });

    test("Should return 404 on get with wrong URL", async () => {
        const appointmentList = await request(app).get("/test/");
        expect(appointmentList.statusCode).toBe(404);
    });

});

const appointmentData = (hours) =>{
    const appointmentHour = new Date(`24 April 2022 ${(hours).toString()}:00 UTC`).toISOString()
    return{
        "name": "Test Name",
        "email": "test@test.com",
        "birthdate": "1999-09-16T12:00:00.000Z",
        "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        "appointmentHour": appointmentHour
    }
}

describe("test POST /api/", () => {

    beforeEach(() => {
        resetList();
      });

    const insertmany = async (repeat, sameHour) =>{
        for(let i = 0; i < repeat; i++){
            await request(app).post("/api/").send(sameHour ? appointmentData(10) : appointmentData(i));
        }
    }

    test("Should return 201 on create appointment with valid data", async () => {
        const storedAppointment = await request(app).post("/api/").send(appointmentData(10));
        expect(storedAppointment.statusCode).toBe(201);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 401 on create 3 appointments for same hour", async () => {
        await insertmany(2, true);
        const storedAppointment = await request(app).post("/api/").send(appointmentData(10));
        expect(storedAppointment.statusCode).toBe(401);
        expect(storedAppointment.body.message).toBe("Voce nao pode fazer esse agendamento");
    });

    test("Should return 401 on create more then 20 appointments for same day", async () => {
        await insertmany(20, false);
        const storedAppointment = await request(app).post("/api/").send(appointmentData(10));
        expect(storedAppointment.statusCode).toBe(401);
        expect(storedAppointment.body.message).toBe("Voce nao pode fazer esse agendamento");
    });

    test("Should return 400 on create an appointment without data", async () => {
        const storedAppointment = await request(app).post("/api/").send({});
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body.message).toBe("Um erro inesperado aconteceu, verifique os dados enviados.");
    });

    test("Should return 201 on create appointment with valid data but withou email", async () => {
        const data = {
                "name": "Test Name",
                "email": "",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(201);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid email", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment without birthdate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid type birthdate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": 123,
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid birthdate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "abcd123",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment without appointmentDate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": "",
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid type appointmentDate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": 123,
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid birthdate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": "test",
                "appointmentHour": new Date(`24 April 2022 10:00 UTC`).toISOString()
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment without appointmentHour", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": ""
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid type appointmentDate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": 123
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });

    test("Should return 400 on create appointment with invalid birthdate", async () => {
        const data = {
                "name": "Test Name",
                "email": "mail",
                "birthdate": "1999-09-16T12:00:00.000Z",
                "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                "appointmentHour": "test"
        }
        const storedAppointment = await request(app).post("/api/").send(data);
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body).toHaveProperty("message");
    });
});

describe("test PUT /api/", () => {

    const insertone = async () =>{
        await request(app).post("/api/").send(appointmentData(10));
        const appointmentList = await request(app).get("/api/");
        return appointmentList.body.list[0].id;
    }

    test("Should return 200 on confirm an appointment without data", async () => {
        const id = await insertone();
        const confirmedAppointment = await request(app).put(`/api/${id}`).send({});
        expect(confirmedAppointment.statusCode).toBe(200);
    });

    test("Should return 200 on confirm an appointment with data", async () => {
        const id = await insertone();
        const confirmedAppointment = await request(app).put(`/api/${id}`).send({comment: "appointment comment"});
        expect(confirmedAppointment.statusCode).toBe(200);
    });

    test("Should return 400 on confirm an appointment with an id that is not registered", async () => {
        const id = "abcdefgh123456789"
        const confirmedAppointment = await request(app).put(`/api/${id}`).send({comment: "appointment comment"});
        expect(confirmedAppointment.statusCode).toBe(400);
        expect(confirmedAppointment.body.message).toBe("Agendamento n??o encontrado.");
    });

    test("Should return 400 on confirm an appointment with invalid data", async () => {
        const id = await insertone();
        const confirmedAppointment = await request(app).put(`/api/${id}`).send({comment: 123456});
        expect(confirmedAppointment.statusCode).toBe(400);
    });

});