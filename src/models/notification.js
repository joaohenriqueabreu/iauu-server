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

const notificationSchema = new Schema({  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  title: { type: String, required: true },
  link: { type: String, required: true }
}, { ...baseSchemaOptions })

class Notification extends BaseModel {
  constructor() {
    super()
  }
}

notificationSchema.loadClass(Notification)
module.exports = db.model('Notification', notificationSchema)
