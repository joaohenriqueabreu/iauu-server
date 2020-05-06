const express   = require('express');
const faker     = require('faker');
const moment    = require('moment');
const app       = express();
const { Location, Media, User, Artist, Contractor, Product, Proposal, Presentation, Schedule, Timeslot } = require('../seeds');

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

app.get('/api/proposals/:id', (req, res) => {
    console.log(`Asking for proposal ${req.params.id}`)
    let proposal = new Proposal()
    proposal.id = req.params.id

    proposal.location = new Location()
    proposal.contractor = new Contractor()
    proposal.product = new Product()
    proposal.files = []
    
    for (let i=0;i < faker.random.number(3); i++) {
        proposal.files.push(new Media())
    }

    console.log("Sending back...")
    console.log(proposal)
    res.status(200).send(proposal)
})

app.get('/api/presentations/:id', (req, res) => res.status(200).send(new Presentation()));

app.post('/api/validate', (req, res) => res.status(200).send(new User()));
app.post('/api/login', (req, res) => res.status(200).send(new User()));
app.post('/api/register', (req, res) => res.status(200).send(new User()));

app.post('/api/schedules', (req, res) => {
    
    console.log("Receiving...")
    console.log(req.body);
       
    let timeslot = new Timeslot()
    timeslot.type = req.body.type
    timeslot.start_dt = req.body.full_day 
        ? moment(req.body.date).toISOString() 
        : moment(`${req.body.date} ${req.body.start_time}`, 'DD/MM/YYYY HH:mm').toISOString()
    timeslot.end_dt = req.body.full_day 
        ? moment(req.body.date).day(1).second(-1).toISOString() 
        : moment(`${req.body.date} ${req.body.end_time}`, 'DD/MM/YYYY HH:mm').toISOString()

    console.log("Delivering...")
    console.log(timeslot)
    res.status(200).send(timeslot);
});

module.exports = app;
