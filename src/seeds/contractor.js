const faker = require('faker');
const Model = require('./model');

module.exports = class Contractor extends Model {
    constructor(loadDetails) {                
        super();       
        this.name               = faker.name.findName();
        this.location           = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
        this.photo              = faker.image.avatar();

        if (loadDetails) {                            
            this.email = faker.internet.email();
            this.phone = faker.phone.phoneNumber();
        }
    }                         
}