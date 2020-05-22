const faker = require('faker');
const Model = require('./model');

const categories = ['banda', 'standup', 'teatro']
const subcategories = {
    banda: ['rock', 'pagode', 'forro', 'gospel', 'metal', 'funk', 'dj'],
    standup: [],
    teatro: []
}

module.exports = class Artist extends Model {
    constructor(loadDetails) {     
        super()
        this.name           = faker.name.findName()
        this.company_name   = faker.company.companyName()
        this.slug           = faker.helpers.slugify(this.company_name).toLowerCase()
        this.is_verified    = faker.random.boolean()
        this.address        = `${faker.address.streetName()} ${Math.ceil(Math.random() * 100)}`
        this.location       = `${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`
        this.zipcode        = faker.address.zipCode()
        this.photo          = faker.image.avatar()
        this.bg_photo       = faker.image.avatar()
        this.rating         = {
            rate: faker.random.number(3) + 2,
            amount: faker.random.number(100)
        }

        this.category     = categories[faker.random.number(2)]
        this.subcategories=[]
        if (this.category === 'banda') {
            for (let i = 1; i <= faker.random.number(5); i++) {
                this.subcategories.push(subcategories.banda[faker.random.number(5)])
            }            
        } 
        
        this.stats      = {
            presentations: faker.random.number(4000),
            public: faker.random.number(10000),            
        }

        this.display_rate = faker.random.boolean()
        if (this.display_rate) {
            this.rate = faker.random.number(10000)            
        }

        if (loadDetails) {
            this.email      = faker.internet.email()
            this.phone      = faker.phone.phoneNumber();
        }
    }
}