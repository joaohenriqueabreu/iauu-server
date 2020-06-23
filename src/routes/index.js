const api  = require('express').Router()

const status = require('./status')
const auth = require('./auth')
const artist = require('./artist')
const contractor = require('./contractor')
const schedule = require('./schedule')
const payment = require('./payment')
const presentation = require('./presentation')

api.use('/', status)
api.use('/', auth)
api.use('/', artist)
api.use('/', contractor)
api.use('/', schedule)
api.use('/', payment)
api.use('/', presentation)

module.exports = api
