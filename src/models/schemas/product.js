const db = require('../../data/db')
const mediaSchema = require('./media')
// const itemSchema = require('./productItem')

module.exports = new db.Schema({
    name: { type: String },
    description: { type: String },
    photo: { type: String },
    price: { type: String },
    media: [mediaSchema],
    items: [String]
})