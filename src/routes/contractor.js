require('dotenv').config()
const api = require('express').Router()

const contractorController = require('../controller/contractor')
const authorizationMiddleware = require('../middleware/authorization')
const validationMiddleware = require('../middleware/validation')

api.get('/artists/search', validationMiddleware.search, contractorController.searchArtists)
api.get('/profile', authorizationMiddleware.authorize, authorizationMiddleware.contractor, contractorController.profile)
api.put('/profile', authorizationMiddleware.authorize, authorizationMiddleware.contractor, validationMiddleware.profile, contractorController.updateProfile)

module.exports = api



// const api   = require('express').Router()

// const contractorController = require('../controller/artist')

// // const { Artist, Contractor } = require('../seeds')


// api.get('/artists', (req, res) => {
//   let artists = []
//   console.log('Requesting artists')
//   if (req.query.length > 0) {
//       const params = JSON.parse(req.query[0])
//       console.log(params.term)
//   }
  
//   for (let i = 0; i < faker.random.number(20); i++) {
//       artists.push(new Artist())
//   }

//   res.status(200).json(artists)
// })

// api.get('/contractors/:id', (req, res) => {
//   res.status(200).json(new Contractor())
// })

// // Proposal is here solely because only contractor can send
// api.post('/proposals', (req, res) => {
//   console.log('Inncoming proposal...')
//   console.log(req.body)

//   res.status(200).json(successMessage)
// })

// module.exports = api