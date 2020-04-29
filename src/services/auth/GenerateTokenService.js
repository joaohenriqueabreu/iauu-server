const BaseService   = require('../BaseService');
const faker         = require('faker');

module.exports = class GenerateTokenService extends BaseService
{
    constructor() { }

    static generate() {
        return faker.random.alphaNumeric(40);
    }
}
