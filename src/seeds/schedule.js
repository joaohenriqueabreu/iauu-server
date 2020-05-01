const faker     = require('faker');
const Model     = require('./model');
const Timeslot  = require('./timeslot');

module.exports = class Schedule extends Model {
    constructor() {  
        super();              
        this.timeslots = [];
        ['proposal', 'presentation', 'unavailable'].forEach((type) => {
            for (let i = 0; i < faker.random.number(20); i++) {
                this.timeslots.push(new Timeslot(type))
            }        
        });        
    }
}