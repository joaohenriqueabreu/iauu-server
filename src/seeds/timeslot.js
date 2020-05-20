const faker = require('faker');
const moment = require('moment');
const Model = require('./model');
const Location = require('./location')
const Contractor = require('./contractor')
const Artist = require('./artist')

class Timeslot extends Model {
    constructor(type) {
        super();
        const hours     = faker.random.number(1000)
        this.type       = type
        this.title      = faker.company.companyName()
        this.location   = new Location()
        this.contractor = new Contractor()
        this.artist     = new Artist()
        this.start_dt   = moment().hours(hours).toISOString()
        this.end_dt     = moment().hours(hours + 4).toISOString()
    }
}

module.exports = Timeslot;