const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')

const counterOfferSchema = new db.Schema({
    price: { type: Number },
    duration: { type: Number },
    status: { type: String, enum: ['void', 'pending', 'accepted', 'rejected'], default: 'void'},
    notes: { type: String },
}, baseSchemaOptions)

module.exports = counterOfferSchema