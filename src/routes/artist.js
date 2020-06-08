const api   = require('express').Router()
const faker     = require('faker')
const moment    = require('moment')
const { Artist, Product, Timeslot } = require('../seeds')


const successMessage = { message: 'success' }

api.get('/artists/:id', (req, res) => {
  console.log("Requisting artists")
  console.log(req.params.id)

  // Checking if we are receiving a bearer token
  console.log(req.headers)

  let artist = new Artist(true)

  artist.products = []
  for (let i =0; i < faker.random.number(4)+ 1; i++) {
      artist.products.push(new Product())
  }

  res.status(200).json(artist)
})

api.get('/products/:id', (req, res) => {
    let products = []
    for (let i = 0; i < faker.random.number(4) + 1; i++) {
        products.push(new Product())
    }

    res.status(200).json(products)
})

api.post('/products', (req, res) => {
    let product = new Product()
    console.log(req.body)
    Object.assign(product, req.body)
    console.log(product)
    res.status(200).json(product)
})

api.delete('/products/:id', (req,res) => res.status(200).json(successMessage))

// Schedules are here, because only artist can alter its states
api.post('/schedules', (req, res) => {        
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
    res.status(200).json(timeslot);
});

// Artist profile routes
api.get('/categories', (req,res) => {
  res.status(200).json([
      {id: faker.random.number(100), name: 'banda'}, 
      {id: faker.random.number(100), name: 'DJ'}, 
      {id: faker.random.number(100), name: 'teatro'}, 
      {id: faker.random.number(100), name: 'circo'}, 
      {id: faker.random.number(100), name: 'standup'}, 
      {id: faker.random.number(100), name: 'outros'}, 
  ])
})

api.get('/categories/:id/subcategories', (req, res) => {
  let subcategories = []
  for(let i=0;i<faker.random.number(10); i++) {
      subcategories.push({id: faker.random.number(1000), name: faker.commerce.product()})
  }

  res.status(200).json(subcategories)
})

module.exports = api