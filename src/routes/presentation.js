require('dotenv').config()
const api = require('express').Router()

const presentationController = require('../controller/presentation')
const authorizationMiddleware = require('../middleware/authorization')
const validationMiddleware = require('../middleware/validation')

api.post('/proposal', 
  authorizationMiddleware.authorize, 
  authorizationMiddleware.contractor, 
  validationMiddleware.proposal, 
  presentationController.saveProposal
)

api.get('/:id', authorizationMiddleware.authorize, validationMiddleware.id, presentationController.search)
api.put('/:id/timeslot', authorizationMiddleware.authorize, validationMiddleware.id, validationMiddleware.timeslot, presentationController.selectTimeslot)

api.post('/:id/proposal', authorizationMiddleware.authorize, authorizationMiddleware.artist, validationMiddleware.id, presentationController.acceptProposal)
api.delete('/:id/proposal', authorizationMiddleware.authorize, authorizationMiddleware.artist, validationMiddleware.id, presentationController.rejectProposal)

api.post('/:id/proposal/counterOffer', 
  authorizationMiddleware.authorize, 
  authorizationMiddleware.artist, 
  validationMiddleware.id, 
  validationMiddleware.counterOffer, 
  presentationController.sendCounterOffer
)

api.put('/:id/proposal/counterOffer', 
  authorizationMiddleware.authorize, 
  authorizationMiddleware.contractor, 
  validationMiddleware.id, 
  presentationController.acceptCounterOffer
)

api.delete('/:id/proposal/counterOffer', 
  authorizationMiddleware.authorize,  
  authorizationMiddleware.contractor, 
  validationMiddleware.id, 
  presentationController.rejectCounterOffer
)

module.exports = api

// const api   = require('express').Router()
// const faker = require('faker')

// const { Proposal, Presentation, Timeslot, Product, Location, Contractor, Artist, Media } = require('../seeds')

// // Artist or contractor viewing the details of a proposal
// api.get('/proposals/:id', (req, res) => {
//   console.log(`Asking for proposal ${req.params.id}`)
//   let proposal = new Proposal()
//   proposal.id = req.params.id

//   proposal.location = new Location()
//   proposal.contractor = new Contractor()
//   proposal.product = new Product()
//   proposal.files = []
  
//   for (let i=0;i < faker.random.number(3); i++) {
//       proposal.files.push(new Media())
//   }

//   console.log("Sending back...")
//   console.log(proposal)
//   res.status(200).json(proposal)
// })

// // Artist accepting a proposal, that becomes a presentation
// // TODO The proposal should not be visible anymore in the calendar 
// api.post('/proposals/:id', (req, res) => {
//   let timeslot = new Timeslot()
//   timeslot.type = 'presentation'    
//   res.status(200).json(timeslot)
// })

// // Artist rejects a presentation
// api.delete('/proposals/:id', (req, res) => {
//   res.status(200).json(successMessage)
// })

// // Artist or contractor viewing the details of a presentation
// api.get('/presentations/:id', (req, res) => {
//   console.log(`Asking for presentation ${req.params.id}`)
//   let presentation = new Presentation()
//   presentation.id = req.params.id  

//   presentation.location = new Location()
//   presentation.contractor = new Contractor()
//   presentation.product = new Product()
//   presentation.files = []
  
//   for (let i=0;i < faker.random.number(3); i++) {
//       presentation.files.push(new Media())
//   }

//   console.log("Sending back...")
//   console.log(presentation)
//   res.status(200).json(presentation)
// })

// // Presenstation confirmed
// api.post('/presentations/:id', (req, res) => {    
//   res.status(200).json(successMessage)
// })

// // Artist rejects a presentation
// api.delete('/presentations/:id', (req, res) => {
//   res.status(200).json(successMessage)
// })

// module.exports = api