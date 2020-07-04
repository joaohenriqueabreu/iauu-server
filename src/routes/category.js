require('dotenv').config()
const api = require('express').Router()

const categoryController = require('../controller/category')

api.get('/', categoryController.categories)
api.get('/:id/subcategories', categoryController.subcategories)

module.exports = api