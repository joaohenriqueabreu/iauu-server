const api  = require('express').Router()

const status = require('./status')
const auth = require('./auth')
const admin = require('./admin')
const category = require('./category')
const artist = require('./artist')
const contractor = require('./contractor')
const schedule = require('./schedule')
const payment = require('./payment')
const presentation = require('./presentation')

api.use('/', status)
api.use('/', auth)
api.use('/admin', admin)
api.use('/categories', category)
api.use('/artists', artist)
api.use('/contractors', contractor)
api.use('/schedules', schedule)
api.use('/presentations', presentation)
api.use('/', payment)

module.exports = api
