const faker = require('faker');
const Model = require('./model');

module.exports = class Artist extends Model {
    constructor(loadDetails) {     
        super();   
        this.name           = faker.name.findName();
        this.company_name   = faker.company.companyName();
        this.is_verified    = faker.random.boolean();
        this.address        = `${faker.address.streetName()} ${Math.ceil(Math.random() * 100)}`
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
        this.zipcode        = faker.address.zipCode();
        this.photo          = faker.image.avatar();
        this.rating         = {
            rate: faker.random.number(5),
            amount: faker.random.number(100)
        }

        if (loadDetails) {
            this.email      = faker.internet.email();
            this.phone      = faker.phone.phoneNumber();
        }
    }
}