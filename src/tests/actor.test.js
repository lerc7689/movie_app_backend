const request = require('supertest');
const app = require('../app.js');

let id;

test("GET /actors debe retornar los actores", async() => {
    const res = await request(app).get("/actors");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /actors  debe crear un actor", async () => {
    const newActor = {
        firstName : "Antonio",
        lastName : "Banderas",
        nationality: "Spain",
        image :"https://url.com",
        birthday : "1965-01-20"
    }
    const res = await request(app).post("/actors").send(newActor);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newActor.name);
    expect(res.body.id).toBeDefined();
})

test("GET /actors/:id  debe encontrar un actor por el id", async() => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
})

test("PUT /actors/:id  debe actualizar un actor", async () => {
    const updatedActor = {
        firstName : "Denzel",
        lastName : "Washington",
        nationality: "USA",
        image :"https://url.com",
        birthday : "1960-03-10"
    }

    const res = await request(app).put(`/actors/${id}`).send(updatedActor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedActor.name);
})

test("DELETE /actors  debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});