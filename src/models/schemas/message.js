const db = require('../../data/db')
const baseSchemaOptions = require('../schemas/options')
const { ObjectId } = require('mongodb')

const messageSchema = new db.Schema({
    author: { 
        name: { type: String },
        id: { type: ObjectId, ref: 'User' }
    },
    type: { type: String, enum: ['text', 'emoji', 'file'] },
    data: { type: Object }
}, baseSchemaOptions)

module.exports = messageSchema