const Customer      = require('./Customer')
const Professional  = require('./Professional')
const Consulting    = require('./Consulting')
const Media         = require('./Media')
const faker         = require('faker')

class Room {
    constructor() {
        this.id             = faker.random.number(10000)
        this.title          = faker.lorem.sentence()
        this.description    = faker.lorem.paragraph()
        this.photo          = faker.image.avatar()
        this.created_at     = faker.date.recent()
        this.category       = {
            name: faker.lorem.words()
        };
        this.area           = {
            height: faker.random.number(10), // Will have to use height for (comprimento) as length is a protected word
            width:  faker.random.number(10)
        };

        this.num_consultings    = faker.random.number(10) + 1
        this.location           = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`
        this.customer           = new Customer()
        this.medias             = []
        this.consultings        = []
        
        const numMedias = faker.random.number(8) + 1;
        for (let i = 0; i < numMedias; i++) {
            this.medias.push(new Media())
        }
    }
}

module.exports = Room