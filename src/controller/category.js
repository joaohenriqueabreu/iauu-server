'use strict'
const faker = require('faker')
const BaseController = require('./base')

class CategoryController extends BaseController {
  categories(req, res, next) {
    res.status(200).json([
        {id: faker.random.number(100), name: 'banda'}, 
        {id: faker.random.number(100), name: 'DJ'}, 
        {id: faker.random.number(100), name: 'teatro'}, 
        {id: faker.random.number(100), name: 'circo'}, 
        {id: faker.random.number(100), name: 'standup'}, 
        {id: faker.random.number(100), name: 'outros'}, 
    ])
  }
  
  subcategories(req, res) {
    let subcategories = []
    for(let i=0;i<faker.random.number(10); i++) {
        subcategories.push({id: faker.random.number(1000), name: faker.commerce.product()})
    }
  
    res.status(200).json(subcategories)
  }
}

module.exports = new CategoryController()