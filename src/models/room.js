const faker     = require('faker');
const Customer  = require('./Customer');

class Room {
    constructor() {
        this.id             = faker.random.number(10000);
        this.title          = faker.lorem.sentence();
        this.description    = faker.lorem.paragraph();
        this.photo          = faker.image.avatar();
        this.created_at     = faker.date.recent();
        this.category       = {
            name: faker.lorem.words()
        };
        this.num_comments   = faker.random.number(10);
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
        this.customer       = new Customer();        
    }
}

module.exports = Room;