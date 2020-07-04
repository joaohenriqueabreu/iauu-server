const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')

module.exports = new db.Schema({
    product: { type: String },
    item: { type: String },
}, baseSchemaOptions)