const db = require('../../data/db')
const mediaSchema = require('./media')
const itemSchema = require('./productItem')

module.exports = new db.Schema({    
    name: {type: String},
    price: {type: String},    
    items: [String],
    media: [mediaSchema],    
})