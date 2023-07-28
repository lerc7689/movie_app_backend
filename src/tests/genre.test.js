const request = require('supertest');
const app = require('../app.js');

let id;

test("GET /genres debe retornar los generos", async() => {
    const res = await request(app).get("/genres");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /genres  debe crear un genero", async () => {
    const newGenre = {
        name: "Comedy"
    }
    const res = await request(app).post("/genres").send(newGenre);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
    expect(res.body.id).toBeDefined();
})

test("GET /genres/:id  debe encontrar un genero por el id", async() => {
    const res = await request(app).get(`/genres/${id}`);
    expect(res.status).toBe(200);
})

test("PUT /genres/:id  debe actualizar un genero", async () => {
    const updatedGenre = {
        name: "Romantic"
    }

    const res = await request(app).put(`/genres/${id}`).send(updatedGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedGenre.name);
})

test("DELETE /genres  debe eliminar un genero", async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});