const faker = require('faker');
const Model = require('./model');

module.exports = class Payment extends Model {
    constructor(status) {        
        super();
        this.status         = status
        this.amount         = faker.random.number(10000)    
        this.presentation_id = faker.random.number(100000)           
        this.create_dt     = faker.date.recent()
    }
}