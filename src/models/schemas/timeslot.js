const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')

const timeslotSchema = new db.Schema({
  title: { type: String },
  description: { type: String },
  start_dt: { type: Date },
  end_dt: { type: Date },
  full_day: { type: Boolean },
  type: { type: String, enum: ['proposal', 'presentation', 'busy']},
  repeat: { type: String, enum: ['day', 'week', 'month', 'year']},
}, baseSchemaOptions)

module.exports = timeslotSchema