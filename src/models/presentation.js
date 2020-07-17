require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')
const baseSchemaOptions = require('./schemas/options')

const proposalSchema = require('./schemas/proposal')
const addressSchema = require('./schemas/address')
const timeslotSchema = require('./schemas/timeslot')

const { Schema } = db

const slugfy = function (slug) {
  return this.company_name !== undefined 
    ? this.company_name.toLowerCase().replace(' ', '-')
    : this.user.name.toLowerCase().replace(' ', '-')
}

const presentationSchema = new Schema({  
  contractor: {
    type: Schema.Types.ObjectId,
    ref: 'Contractor'
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },

  address: addressSchema,

  /**
   * Proposal   - Proposal stage
   * Accepted   - Proposal accepted (pré-presentation)
   * Completed  - Presentation completed
   * Rejected   - Proposal rejected
   * Cancelled  - Presentation cancelled
   */

  status: { type: String, enum: ['proposal', 'accepted', 'completed', 'rejected', 'cancelled'], required: true },
  timeslot: timeslotSchema,
  proposal: proposalSchema,
  price: { type: Number },
  duration: { type: Number }
}, { ...baseSchemaOptions })

class Presentation extends BaseModel {
  constructor() {
    super()
  }
}

presentationSchema.loadClass(Presentation)
module.exports = db.model('Presentation', presentationSchema)
