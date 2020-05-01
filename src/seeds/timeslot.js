const faker = require('faker');
const moment = require('moment');
const Model = require('./model');

class Timeslot extends Model {
    constructor(type) {
        super();
        const hours = faker.random.number(100);
        this.type       = type;
        this.start_dt   = moment().hours(hours).toISOString();
        this.end_dt     = moment().hours(hours + 8).toISOString();
    }
}

module.exports = Timeslot;