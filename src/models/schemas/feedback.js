const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')
const { ObjectId } = require('mongodb')

const feedbackSchema = new db.Schema({
    rating: { type: Number },
    notes: { type: String },
    from: {
      name: { type: String },
      photo: { type: String },
      contractor: { type: ObjectId, ref: 'Contractor' }
    },
    presentation: { type: ObjectId, ref: 'Presentation' }
}, baseSchemaOptions)

module.exports = feedbackSchema