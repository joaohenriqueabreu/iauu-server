const faker = require('faker');
const Model = require('./model');

module.exports = class Product extends Model {
    constructor() {                
        super();                     
        this.name = faker.commerce.productName()
        this.price = faker.commerce.price()
        this.duration = faker.random.number(5) + 1
    }                         
}