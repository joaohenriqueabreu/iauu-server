require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')

const addressSchema = require('./address')
const socialSchema = require('./media')

const { Schema } = db

const artistSchema = new Schema({
  user :{
    type: db.Schema.Types.ObjectId,
    ref: 'User'
  },

  company_name: { type: String },
  document: { type: String },
  phone: { type: String },
  story: { type: String },
  media: {
    bg: { type: String },
    photo: { type: String },
    presentations: [String]
  },
  category: {
    name: { type: String },
    subcategories: [String]
  },
  tags: [String],
  social: [socialSchema],
  address: addressSchema
})

class Artist extends BaseModel {
  constructor() {
    super()
  }
}

artistSchema.loadClass(Artist)
module.exports = db.model('Artist', artistSchema)
