const db = require('../data/db')
const coordinates = require('./coordinates')

module.exports = new db.Schema({    
    street: {type: String},
    number: {type: String},
    neighboorhood: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zipcode: {type: String},
    coordinates: {type: coordinates},    
})