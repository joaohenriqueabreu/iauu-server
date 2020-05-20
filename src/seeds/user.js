const faker = require('faker')
const Model = require('./model')

module.exports = class User extends Model {
    constructor(type) {      
        super()  
        this.type           = [type]
        this.email          = faker.internet.email()
        this.public_name    = faker.name.findName()
        this.name           = faker.name.findName()
        this.company_name   = faker.company.companyName()
        this.is_verified    = faker.random.boolean()
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`
        this.photo          = faker.image.avatar()
        this.token          = faker.random.alphaNumeric(128)
        this.requires_initial_setup = faker.random.boolean()        
    }
}