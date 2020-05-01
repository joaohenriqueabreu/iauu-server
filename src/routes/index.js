const express   = require('express');
const faker     = require('faker');
const app       = express();
const { User, Artist, Contractor, Proposal, Presentation, Schedule, Timeslot } = require('../seeds');

const successMessage = { message: 'success' };
const generateToken  = { token: faker.random.alphaNumeric(128) }

app.get('/api/schedules/:id', (req, res) => {    
    res.status(200).send(new Schedule());
});

app.get('/api/artists', (req, res) => {
    let artists = [];
    for (let i = 0; i < faker.random.number(20); i++) {
        artists.push(new Artist());
    }

    res.status(200).send(artists);
});

app.get('/', (req, res) => res.status(200).send({ message: "Service up and running" }));
app.get('/api/artists/:id', (req, res) => res.status(200).send(new Artist(true)));
app.get('/api/contractors/:id', (req, res) => res.status(200).send(new Contractor()));
app.get('/api/proposals/:id', (req, res) => res.status(200).send(new Proposal()));
app.get('/api/presentations/:id', (req, res) => res.status(200).send(new Presentation()));

app.post('/api/validate', (req, res) => res.status(200).send(new User()));
app.post('/api/login', (req, res) => res.status(200).send(new User()));
app.post('/api/register', (req, res) => res.status(200).send(new User()));

module.exports = app;
