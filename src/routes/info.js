require('dotenv').config()
const api = require('express').Router()

const infoController = require('../controller/artist')

api.get('/categories', infoController.categories)

module.exports = api