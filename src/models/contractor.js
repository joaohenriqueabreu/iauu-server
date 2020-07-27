require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')

const address = require('./schemas/address')
const baseSchemaOptions = require('./schemas/options')

const { Schema } = db

const contractorSchema = new Schema({
  user :{
    type: db.Schema.Types.ObjectId,
    ref: 'User'
  },

  public_name: { type: String},
  phone: { type: String }, 
  address: {type: address}
}, { ...baseSchemaOptions })

class Contractor extends BaseModel {
  constructor() {
    super()
  }
}

contractorSchema.loadClass(Contractor)
module.exports = db.model('Contractor', contractorSchema)
