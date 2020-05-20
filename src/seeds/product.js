const faker = require('faker')
const Model = require('./model')
const Media = require('./media')
const randomSocial = require('./social')

module.exports = class Product extends Model {
    constructor() {                
        super();                     
        this.name = faker.commerce.productName()
        this.description = faker.lorem.paragraphs(5)
        this.price = faker.commerce.price()
        this.duration = faker.random.number(5) + 1

        this.documents = []
        this.medias = []
        for(let i =0; i < faker.random.number(3); i++) {
            const mediaType = faker.random.boolean() ? 'pdf' : 'docx'
            this.documents.push(new Media(mediaType))
        }

        for(let i =0; i < faker.random.number(5); i++) {
            const media = new Media()
            media.url = randomSocial[faker.random.number(randomSocial.length - 1)]
            this.medias.push(media)
        }
    }                         
}