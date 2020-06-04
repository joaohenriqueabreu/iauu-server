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
        this.story          = faker.lorem.paragraphs(10)        
        this.rating         = {
            score: faker.random.number(3) + 2,
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
            fans: faker.random.number(3000000) ,
            score: this.rating.score           
        }

        this.display_rate = faker.random.boolean()        

        if (loadDetails) {
            this.score      = faker.random.number(10000)            
            this.email      = faker.internet.email()
            this.phone      = faker.phone.phoneNumber()
            this.medias     = [
                'https://open.spotify.com/track/3UpS7kBnkVQYG13pDDFTC4?si=UioD9IQZR1SiR6S8hXxX7Q',
                // 'https://vimeo.com/69185882',
                'https://vm.tiktok.com/3K3wfo/',
                'https://www.instagram.com/p/B_T31QpFQhh/?igshid=1nu761g1bcs39',
                'https://youtu.be/g4pQi3XCg7U',
                'https://youtu.be/yntTx5aE9Rc',
                'https://www.instagram.com/p/B_8yFy3lsUJ/?igshid=4a8snfjko1xn',
            ]

            this.testemonials = []
            for (let i = 0; i< faker.random.number(50);i++) {
                this.testemonials.push({
                    photo: faker.image.avatar(),
                    user: faker.name.findName(),
                    content: faker.lorem.paragraph(3)
                })
            }
        }
    }
}