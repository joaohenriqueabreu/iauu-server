const faker     = require('faker');
const Model     = require('./model');
const Timeslot  = require('./timeslot');

module.exports = class Schedule extends Model {
    constructor(isContractorViewer) {  
        super();              
        this.timeslots = [];

        const timeslotTypes = isContractorViewer ? ['busy'] : ['proposal', 'presentation', 'unavailable']
        timeslotTypes.forEach((type) => {
            for (let i = 0; i < faker.random.number(20); i++) {
                let timeslot = new Timeslot(type)            
                this.timeslots.push(timeslot)
            }        
        });
    }
}