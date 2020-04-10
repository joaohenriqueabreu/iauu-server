const faker = require('faker');

module.exports = class Media {
    constructor() {
        this.id     = faker.random.number(500000);
        this.type   = 'image';
        this.url    = faker.image.avatar();
    }            
}