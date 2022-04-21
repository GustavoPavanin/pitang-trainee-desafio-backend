import { request } from "supertest";
import app from "../server.js";
describe("test GET /api/", () => {

    test("Test My app server", async () => {
        const res = await request(app).get('/');
        expect(res.body).toHaveProperty('message');
    })

})