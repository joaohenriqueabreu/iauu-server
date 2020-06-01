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
        
        const media = new Media()
        if (faker.random.boolean()) {
            media.url = 'https://youtu.be/yntTx5aE9Rc'
            media.type = 'video'
            this.main_media = media
        } else {
            media.url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
            media.type = 'image'
            this.main_media = media
        }
        
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