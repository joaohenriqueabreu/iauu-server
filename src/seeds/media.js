const faker = require('faker');
const Model = require('./model');

module.exports = class Media extends Model {
    constructor() {                
        super();       
        this.url = faker.internet.url
        this.subtitle = faker.system.fileName()
        this.type = faker.system.fileExt()        
    }                         
}