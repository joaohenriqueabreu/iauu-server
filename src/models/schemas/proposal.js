const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')
const timeslotSchema = require('./timeslot')
const productSchema = require('./product')
const counterOfferSchema = require('./counterOffer')

const proposalSchema = new db.Schema({
    title: { type: String },
    price: { type: Number },
    duration: { type: Number },
    timeslots: [timeslotSchema],
    product: productSchema,
    notes: { type: String },
    counterOffer: counterOfferSchema
}, baseSchemaOptions)

module.exports = proposalSchema