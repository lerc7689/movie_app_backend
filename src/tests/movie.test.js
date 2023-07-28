const request = require('supertest');
const app = require('../app.js');
const Actor = require('../models/Actor.js');
const Director = require('../models/Director.js');
const Genre = require('../models/Genre.js');
require('../models');

let id;

test("GET /movies debe retornar las peliculas", async() => {
    const res = await request(app).get("/movies");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("POST /movies  debe crear una pelicula", async () => {
    const newMovie = {
        name: "Rocky IV",
        image : "https://m.media-amazon.com/images/I/812ejwsxTDL._UF1000,1000_QL80_.jpg",
        synopsis : "La película empieza donde termina ....",
        releaseYear : "1965-01-20"
    }
    const res = await request(app).post("/movies").send(newMovie);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
    expect(res.body.id).toBeDefined();
})

test("GET /movies/:id  debe encontrar una pelicula por el id", async() => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
})

test("PUT /movies/:id  debe actualizar una pelicula", async () => {
    const updatedMovie = {
        name: "Rocky IV",
        image : "https://m.media-amazon.com/images/I/812ejwsxTDL._UF1000,1000_QL80_.jpg",
        synopsis : "La película empieza donde termina ....",
        releaseYear : "1965-01-20"
    }

    const res = await request(app).put(`/movies/${id}`).send(updatedMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedMovie.name);
})

test("Post /movies/:id/actors  debe agregar actores a una pelicula", async () => {

    const actor = await Actor.create({
        firstName : "Denzel",
        lastName : "Washington",
        nationality: "USA",
        image :"https://url.com",
        birthday : "1960-03-10"
    })

    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("Post /movies/:id/directors  debe agregar directores a una pelicula", async () => {

    const director = await Director.create({
        firstName : "Alfonso",
        lastName : "Rodriguez",
        nationality: "RD",
        image :"https://url.com",
        birthday : "1960-03-10"
    })

    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("Post /movies/:id/genres  debe agregar generos a una pelicula", async () => {

    const genre = await Genre.create({
        name : "Terror"
    })

    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("DELETE /movies  debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});

