require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')

const address = require('./address')

const { Schema } = db

const artistSchema = new Schema({
  user :{
    type: db.Schema.Types.ObjectId,
    ref: 'User'
  },

  company_name: { type: String, required: true },
  story: { type: String },
  media: {
    bg: { type: String },
    photo: { type: String },
    presentations: [String]
  },
  social: [String],
  address: {type: address}
  
})

class Artist extends BaseModel {
  constructor() {
    super()
  }
}

artistSchema.loadClass(Artist)
module.exports = db.model('Artist', artistSchema)
