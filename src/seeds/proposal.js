const faker = require('faker');
const Model = require('./model');

module.exports = class Proposal extends Model {
    constructor() {      
        super();  
        this.title          = faker.lorem.sentence();
        this.description    = faker.lorem.paragraphs(5);
        this.start_dt       = faker.date.recent();
        this.end_at         = faker.date.recent();
        this.created_at     = faker.date.recent();                        
    }
}