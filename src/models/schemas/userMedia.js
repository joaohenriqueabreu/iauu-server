const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')

module.exports = new db.Schema({    
    bg: { type: String },
    photo: { type: String }
}, baseSchemaOptions)