const faker = require('faker');

module.exports = class Model {
    constructor() {
        this.id = faker.random.number(10000);
    }
}