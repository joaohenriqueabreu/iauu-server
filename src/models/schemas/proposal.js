const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')
const timeslotSchema = require('./timeslot')
const productSchema = require('./product')

const proposalSchema = new db.Schema({
    price: { type: Number },
    duration: { type: Number },
    timeslot: timeslotSchema,
    product: productSchema
    // timeslots: { 
    //   type: [timeslotSchema], 
    //   validate: (timeslot) => Array.isArray(timeslot) && timeslot.length > 0,
    // }
}, baseSchemaOptions)

module.exports = proposalSchema