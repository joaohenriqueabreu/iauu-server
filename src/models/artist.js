require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')
const baseSchemaOptions = require('./schemas/options')
const { v4: uid } = require('uuid');

const addressSchema = require('./schemas/address')
const socialSchema = require('./schemas/media')
const productsSchema = require('./schemas/product')
const timeslotSchema = require('./schemas/timeslot')
const feedbackSchema = require('./schemas/feedback')

const { Schema } = db

const slugfy = function (slug) {
  return this.company_name !== undefined 
    ? this.company_name.toLowerCase().replace(' ', '-')
    : this.user.name.toLowerCase().replace(' ', '-')
}

const artistSchema = new Schema({  
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  company_name: { type: String },
  slug: { 
    type: String,
    default: uid()
  },
  document: { type: String },
  phone: { type: String },
  story: { type: String },
  media: {
    bg: { type: String },
    presentations: [String]
  },
  category: {
    name: { type: String },
    subcategories: [String]
  },

  products: [productsSchema],
  schedule: [timeslotSchema],

  tags: [String],
  social: [socialSchema],
  address: addressSchema,
  feedbacks: [feedbackSchema]
}, { ...baseSchemaOptions })

class Artist extends BaseModel {
  constructor() {
    super()
  }
}

artistSchema.index({ company_name: 'text', story: 'text', 'category.name': 'text', 'category.subcategory': 'text', tags: 'text' });
artistSchema.loadClass(Artist)
module.exports = db.model('Artist', artistSchema)
