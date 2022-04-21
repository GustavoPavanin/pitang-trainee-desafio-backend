import request from "supertest";
import app from "../app";

describe("test GET /api/", () => {

    test("Should return 200 and a list in your body on get appointments", async () => {
        const appointmentList = await request(app).get("/api/");
        expect(appointmentList.statusCode).toBe(200);
        expect(appointmentList.body).toHaveProperty("list");
    });

});

describe("test POST /api/", () => {

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
        await insertmany(21, false);
        const storedAppointment = await request(app).post("/api/").send(appointmentData(10));
        expect(storedAppointment.statusCode).toBe(401);
        expect(storedAppointment.body.message).toBe("Voce nao pode fazer esse agendamento");

    });

    test("Should return 400 on create an appointment without data", async () => {
        const storedAppointment = await request(app).post("/api/").send({});
        expect(storedAppointment.statusCode).toBe(400);
        expect(storedAppointment.body.message).toBe("Um erro inesperado aconteceu, verifique os dados enviados.");

    });
});