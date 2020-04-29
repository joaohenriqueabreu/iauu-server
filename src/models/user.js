const faker = require('faker');

class User {
    constructor(type) {
        this.id             = faker.random.number(10000);
        this.type           = type;
        this.email          = faker.internet.email();
        this.public_name    = faker.name.findName();
        this.name           = faker.name.findName();
        this.company_name   = faker.company.companyName();
        this.is_verified    = faker.random.boolean();        
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
        this.photo          = faker.image.avatar();
        this.token          = faker.random.alphaNumeric(40);
        this.rating         = {
            rate: faker.random.number(5),
            amount: faker.random.number(100)
        }
    }
}

module.exports = User;