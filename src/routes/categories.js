require('dotenv').config()
const api = require('express').Router()

const artistController = require('../controller/artist')

api.get('/', artistController.categories)
api.get('/:id/subcategories', artistController.subcategories)

module.exports = api