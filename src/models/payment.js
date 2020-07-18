require('dotenv').config()
const db = require('../data/db')
const BaseModel = require('./base')
const baseSchemaOptions = require('./schemas/options')
const accountSchema = require('./schemas/account')

const { Schema } = db

const paymentSchema = new Schema({
  presentation: {
    type: Schema.Types.ObjectId,
    ref: 'Presentation'
  },
  from: accountSchema,
  to: accountSchema,

  amount: { type: Number, required: true },
  our_fee: { type: Number, required: true },
  transaction_fee: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
  notes: { type: String },
  transaction: { type: String },
}, { ...baseSchemaOptions })

class Payment extends BaseModel {
  constructor() {
    super()
  }
}

paymentSchema.loadClass(Payment)
module.exports = db.model('Payment', paymentSchema)
