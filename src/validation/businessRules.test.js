import request from "supertest";
import app from "../app";
import businessRules from "./businessRules";

describe("test businessRules function cases", () => {

    const formattedDate = (validDate) =>{
        
        let tomorow = new Date(new Date().setDate(new Date().getDate() + (validDate ? 1 : -1)));
        let year = tomorow.getFullYear();
        let month = (1 + tomorow.getMonth()).toString().padStart(2, '0');
        let day = tomorow.getDate().toString().padStart(2, '0');
      
        return month + '/' + day + '/' + year;
      }

    const appointmentData = (hours) =>{
        const appointmentHour = new Date(`24 April 2022 ${(hours).toString()}:00Z UTC`).toISOString()
        return{
            "name": "Test Name",
            "email": "test@test.com",
            "birthdate": "1999-09-16T12:00:00.000Z",
            "appointmentDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
            "appointmentHour": appointmentHour
        }
    }

    const insertmany = async (repeat) =>{
        for(let i = 0; i < repeat; i++){
            await request(app).post("/api/").send(repeat <= 2 ? appointmentData(10) : appointmentData(i));
        }
    }

    test("Should return true with date and hour valid", async () => {
        const appointmentDate = formattedDate(true);
        const appointmentHour = "15:00";
        expect(businessRules(appointmentDate,appointmentHour)).toBe(true);
    });

    test("Should return false with date invalid", async () => {
        const appointmentDate = formattedDate(false);
        const appointmentHour = "15:00";
        expect(businessRules(appointmentDate,appointmentHour)).toBe(false);
    });

    test("Should return false with hour invalid", async () => {
        const appointmentDate = formattedDate(true);
        const appointmentHour = "15:30";
        expect(businessRules(appointmentDate,appointmentHour)).toBe(false);
    });

    test("Should return false with already 2 appointments with the same hour", async () => {
        await insertmany(2);
        const appointmentDate = formattedDate(true);
        const appointmentHour = "10:00";
        expect(businessRules(appointmentDate,appointmentHour)).toBe(false);
    });

    test("Should return false with already 20 appointments with the same day", async () => {
        await insertmany(20);
        const appointmentDate = formattedDate(true);
        const appointmentHour = "10:00"
        expect(businessRules(appointmentDate,appointmentHour)).toBe(false);
    });

});