const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')
const timeslotSchema = require('./timeslot')
const productSchema = require('./product')

const proposalSchema = new db.Schema({
    title: { type: String },
    price: { type: Number },
    duration: { type: Number },
    timeslots: [timeslotSchema],
    product: productSchema,
    notes: { type: String }
    // timeslots: { 
    //   type: [timeslotSchema], 
    //   validate: (timeslot) => Array.isArray(timeslot) && timeslot.length > 0,
    // }
}, baseSchemaOptions)

module.exports = proposalSchema