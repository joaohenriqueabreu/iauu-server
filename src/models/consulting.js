const faker         = require('faker');
const Professional  = require('./Professional');
const Room          = require('./Room');

module.exports = class Consulting {
    constructor() {
        this.id             = faker.random.number(10000);
        this.created_at     = faker.date.recent();
        this.num_comments   = faker.random.number(50);
        this.room           = new Room();
        this.professional   = new Professional();        
    }
}