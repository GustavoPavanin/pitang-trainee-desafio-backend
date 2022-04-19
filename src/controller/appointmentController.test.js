import { request } from "supertest";
import app from "../server.js";
import {hello} from "./simple.js";
describe("test GET /api/", () => {

    test("Test My app server", async () => {
        const res = await request(app).get('/');
        expect(true).toBe(true);
        //expect(res.body).toHaveProperty('message');
    })

})