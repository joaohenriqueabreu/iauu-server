const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')

module.exports = new db.Schema({
    title: { type: String },
    description: { type: String },
}, baseSchemaOptions)