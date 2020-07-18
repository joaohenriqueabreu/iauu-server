const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')

const accountSchema = new db.Schema({
    name: { type: String },
    email: { type: String },
    document: { type: String },
    provider_id: { type: String }
}, baseSchemaOptions)

module.exports = accountSchema