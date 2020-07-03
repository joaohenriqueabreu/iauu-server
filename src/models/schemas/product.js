const db = require('../../data/db')
const mediaSchema = require('./media')
// const itemSchema = require('./productItem')

const productSchema = new db.Schema({
    name: { type: String },
    description: { type: String },
    photo: { type: String },
    price: { type: Number },
    duration: { type: Number },
    medias: [mediaSchema],
    items: [String]
})

productSchema.index({ name: 'text', description: 'text', items: 'text' })
module.exports = productSchema