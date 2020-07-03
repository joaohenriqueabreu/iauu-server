const db = require('../../data/db')

module.exports = new db.Schema({
    product: { type: String },
    item: { type: String },
})