require('dotenv').config()
const api = require('express').Router()

const artistController = require('../controller/artist')
const authorizationMiddleware = require('../middleware/authorization')
const validationMiddleware = require('../middleware/validation')

api.get('/:id/public', artistController.publicInfo)
api.get('/:id/private', authorizationMiddleware.authorize, artistController.privateInfo)

api.get('/profile', authorizationMiddleware.authorize, authorizationMiddleware.artist, artistController.profile)
api.put('/profile', authorizationMiddleware.authorize, authorizationMiddleware.artist, validationMiddleware.profile, artistController.updateProfile)

api.get('/products', authorizationMiddleware.authorize, authorizationMiddleware.artist, artistController.products)
api.get('/:id/products', validationMiddleware.id, authorizationMiddleware.authorize, artistController.products)
api.post('/products', validationMiddleware.product, authorizationMiddleware.authorize, authorizationMiddleware.artist, artistController.saveProduct)
api.delete('/products/:id', validationMiddleware.id, authorizationMiddleware.authorize, authorizationMiddleware.artist, artistController.deleteProduct)

module.exports = api

// const api   = require('express').Router()
// const faker     = require('faker')
// const moment    = require('moment')
// const { Artist, Product, Timeslot } = require('../seeds')


// const successMessage = { message: 'success' }

// api.get('/artists/:id', (req, res) => {

// })

// api.get('/products/:id', (req, res) => {
//     let products = []
//     for (let i = 0; i < faker.random.number(4) + 1; i++) {
//         products.push(new Product())
//     }

//     res.status(200).json(products)
// })

// api.post('/products', (req, res) => {
//     let product = new Product()
//     console.log(req.body)
//     Object.assign(product, req.body)
//     console.log(product)
//     res.status(200).json(product)
// })

// api.delete('/products/:id', (req,res) => res.status(200).json(successMessage))

// // Schedules are here, because only artist can alter its states
// api.post('/schedules', (req, res) => {        
//     let timeslot = new Timeslot()
//     timeslot.type = req.body.type
//     timeslot.start_dt = req.body.full_day 
//         ? moment(req.body.date).toISOString() 
//         : moment(`${req.body.date} ${req.body.start_time}`, 'DD/MM/YYYY HH:mm').toISOString()
//     timeslot.end_dt = req.body.full_day 
//         ? moment(req.body.date).day(1).second(-1).toISOString() 
//         : moment(`${req.body.date} ${req.body.end_time}`, 'DD/MM/YYYY HH:mm').toISOString()
        
//     console.log("Delivering...")
//     console.log(timeslot)
//     res.status(200).json(timeslot);
// });

// // Artist profile routes


// module.exports = api