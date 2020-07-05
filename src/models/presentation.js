require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')
const baseSchemaOptions = require('./schemas/options')

const proposalSchema = require('./schemas/proposal')
const addressSchema = require('./schemas/address')

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

  status: { type: String, enum: ['proposal', 'accepted', 'completed'], required: true },
  proposal: proposalSchema

}, { ...baseSchemaOptions })

class Presentation extends BaseModel {
  constructor() {
    super()
  }
}

presentationSchema.loadClass(Presentation)
module.exports = db.model('Presentation', presentationSchema)
