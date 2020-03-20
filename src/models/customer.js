const faker      = require('faker');
const Consulting = require('./consulting');

class Customer {
    constructor(loadConsultings) {
        this.id                 = faker.random.number(10000);
        this.has_private_access = faker.random.boolean();
        this.has_consulted_with_professional = faker.random.boolean();
        this.public_name        = faker.name.findName();
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
        if (this.has_private_access) {
            this.private = {
                name: faker.name.findName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber()
            };
        }
        
        this.rating         = {
            rate: faker.random.number(5),
            amount: faker.random.number(100)
        };

        if (loadConsultings) {
            let numConsultings = faker.random.number(10);
            this.consultings   = [];
            for (let i = 0; i < numConsultings; i++) {
                this.consultings.push(new Consulting())
            }
        }        
    }
}

module.exports = Customer;