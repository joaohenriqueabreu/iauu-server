const faker = require('faker');
const Model = require('./model');

module.exports = class Location extends Model {
    constructor() {                
        super();                     
        this.address = faker.address.streetAddress()        
        this.number = faker.random.number(10000)
        this.city = faker.address.city()
        this.state = faker.address.stateAbbr()
        this.country  = faker.address.countryCode()
        this.zipcode = faker.address.zipCode()
        this.latitude = faker.address.latitude
        this.longitue = faker.address.longitude()

        this.display = `${this.address}, ${this.number}, ${this.city}, ${this.state}, ${this.country}` 
    }                         
}