require('dotenv').config()
const jwt = require('express-jwt')

const authorize = jwt({ secret: process.env.AUTH_SECRET })
const owner = (req, res, next) => {
  // Should always come after authorize 
  console.log('Checking if user owns request...')
  if (req.user.id !== req.params.id) {
    console.log('Not the owner')
    next('Unauthorized')
  }

  console.log('Owner...')
  next()
}

const artist = (req, res, next) => {
  console.log('Checking if user is artist...')
  if (!req.user.role.includes('artist')) {
    console.log('Not an artist')
    next('Unauthorized')
  }

  console.log('Artist...')
  next()  
}

const contractor = (req, res, next) => {
  console.log('Checking if user is contractor...')
  if (!req.user.role.includes('contractor')) {
    console.log('Not a contractor')
    next('Unauthorized')
  }

  console.log('Contractor...')
  next()  
}

module.exports = { authorize, owner, artist, contractor }
