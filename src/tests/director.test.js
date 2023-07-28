const request = require('supertest');
const app = require('../app.js');

let id;

test("GET /directors debe retornar los directores", async() => {
    const res = await request(app).get("/directors");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /directors  debe crear un director", async () => {
    const newDirector = {
        firstName : "James",
        lastName : "Mangold",
        nationality: "USA",
        image :"https://url.com",
        birthday : "1965-01-20"
    }
    const res = await request(app).post("/directors").send(newDirector);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newDirector.name);
    expect(res.body.id).toBeDefined();
})

test("GET /directors/:id  debe encontrar un director por el id", async() => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
})

test("PUT /directors/:id  debe actualizar un director", async () => {
    const updatedDirector = {
        firstName : "Alfonso",
        lastName : "Rodriguez",
        nationality: "RD",
        image :"https://url.com",
        birthday : "1960-03-10"
    }

    const res = await request(app).put(`/directors/${id}`).send(updatedDirector);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedDirector.name);
})

test("DELETE /directors  debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});