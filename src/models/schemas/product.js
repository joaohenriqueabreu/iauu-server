const db = require('../../data/db')
const mediaSchema = require('./media')
const baseSchemaOptions = require('../schemas/options')

const productSchema = new db.Schema({
    name: { type: String },
    description: { type: String },
    photo: { type: String },
    price: { type: Number },
    duration: { type: Number },
    medias: [mediaSchema],
    items: [String]
}, baseSchemaOptions)

productSchema.index({ name: 'text', description: 'text', items: 'text' })
module.exports = productSchema