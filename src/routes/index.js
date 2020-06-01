const express   = require('express')
const faker     = require('faker')
const moment    = require('moment')
const jwt       = require('jwt-simple')
const app       = express()
const { Location, Media, User, Artist, Contractor, Product, Proposal, Presentation, Schedule, Timeslot, Payment } = require('../seeds')

const { GenerateTokenService } = require('../services/auth')
const successMessage = { message: 'success' }

let sessionUserType = 'guest'

app.get('/api/schedules/:id/:year', (req, res) => {
    console.log('Requsting schedule...')                        
    const schedule = new Schedule(sessionUserType === 'contractor')
    schedule.timeslots.sort((timeslot1, timeslot2) => {        
        return moment(timeslot1.start_dt).unix() - moment(timeslot2.start_dt).unix()
    })

    console.log(`Returning ${schedule.timeslots.length} events`)

    res.status(200).send(schedule)
})

app.get('/api/artists', (req, res) => {
    let artists = []
    console.log('Requesting artists')
    if (req.query.length > 0) {
        const params = JSON.parse(req.query[0])
        console.log(params.term)
    }
    
    for (let i = 0; i < faker.random.number(20); i++) {
        artists.push(new Artist())
    }

    res.status(200).send(artists)
})

app.get('/', (req, res) => res.status(200).send({ message: "Service up and running" }))
app.get('/api/artists/:id', (req, res) => {
    console.log("Requisting artist")
    console.log(req.params.id)

    // Checking if we are receiving a bearer token
    console.log(req.headers)

    let artist = new Artist(true)

    artist.products = []
    for (let i =0; i < faker.random.number(4)+ 1; i++) {
        artist.products.push(new Product())
    }

    res.status(200).send(artist)
})
app.get('/api/contractors/:id', (req, res) => res.status(200).send(new Contractor()))

app.post('/api/validate', (req, res) => {
    console.log('Attempting to validate token')
    const token = req.headers.authorization.replace('Bearer ', '')

    try {
        const { type } = jwt.decode(token, process.env.AUTH_SECRET)

        sessionUserType = type
        res.status(200).send(new User(type))
    } catch (error) {
        res.status(400).send({message: 'Token expired'})
    }    
})

app.post('/api/login', (req, res) => {
    console.log('Login attempt from...')
    console.log(req.body)
    res.status(200).send(GenerateTokenService.generate(req.body))
})

app.delete('/api/login', (req, res) => {
    res.status(200).send({})
})

app.post('/api/register', (req, res) => res.status(200).send(new User()))

app.get('/api/products/:id', (req, res) => {
    let products = []
    for (let i = 0; i < faker.random.number(4) + 1; i++) {
        products.push(new Product())
    }

    res.status(200).send(products)
})

app.post('/api/products', (req, res) => {
    let product = new Product()
    console.log(req.body)
    Object.assign(product, req.body)
    console.log(product)
    res.status(200).send(product)
})

app.delete('/api/products/:id', (req,res) => res.status(200).send(successMessage))

app.post('/api/schedules', (req, res) => {        
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

// Proposal routes

// Artist or contractor viewing the details of a proposal
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

// contractor sending proposal
app.post('/api/proposals', (req, res) => {
    console.log('Inncoming proposal...')
    console.log(req.body)

    res.status(200).send(successMessage)
})

// Artist accepting a proposal, that becomes a presentation
// TODO The proposal should not be visible anymore in the calendar 
app.post('/api/proposals/:id', (req, res) => {
    let timeslot = new Timeslot()
    timeslot.type = 'presentation'    
    res.status(200).send(timeslot)
})

// Artist rejects a presentation
app.delete('/api/proposals/:id', (req, res) => {
    res.status(200).send(successMessage)
})

// Artist or contractor viewing the details of a presentation
app.get('/api/presentations/:id', (req, res) => {
    console.log(`Asking for presentation ${req.params.id}`)
    let presentation = new Presentation()
    presentation.id = req.params.id

    presentation.location = new Location()
    presentation.contractor = new Contractor()
    presentation.product = new Product()
    presentation.files = []
    
    for (let i=0;i < faker.random.number(3); i++) {
        presentation.files.push(new Media())
    }

    console.log("Sending back...")
    console.log(presentation)
    res.status(200).send(presentation)
})

// Presenstation confirmed
app.post('/api/presentations/:id', (req, res) => {    
    res.status(200).send(successMessage)
})

// Artist rejects a presentation
app.delete('/api/presentations/:id', (req, res) => {
    res.status(200).send(successMessage)
})

app.get('/api/categories', (req,res) => {
    res.status(200).send([
        {id: faker.random.number(100), name: 'banda'}, 
        {id: faker.random.number(100), name: 'DJ'}, 
        {id: faker.random.number(100), name: 'teatro'}, 
        {id: faker.random.number(100), name: 'circo'}, 
        {id: faker.random.number(100), name: 'standup'}, 
        {id: faker.random.number(100), name: 'outros'}, 
    ])
})

app.get('/api/categories/:id/subcategories', (req, res) => {
    let subcategories = []
    for(let i=0;i<faker.random.number(10); i++) {
        subcategories.push({id: faker.random.number(1000), name: faker.commerce.product()})
    }

    res.status(200).send(subcategories)
})

app.get('/api/payments', (req, res) => {
    payments = []
    stats = {
        closed: 0,
        active: 0,
        pending: 0,
        total: 0
    }

    const statuses = ['closed', 'active', 'pending']
    statuses.forEach(status => {
        for (let i=0; i< faker.random.number(6); i++) {
            const payment = new Payment(status)
            payments.push(payment)
            stats[status] += payment.amount            
        }                
    })

    stats.total = stats.pending + stats.active

    payments.sort((payment1, payment2) => {        
        return -(moment(payment1.create_dt).unix() - moment(payment2.create_dt).unix())
    })

    res.status(200).send({
        payments, stats
    })
})

module.exports = app;
