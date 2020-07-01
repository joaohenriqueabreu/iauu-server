const db = require('../../data/db')

module.exports = new db.Schema({    
    bg: { type: String },
    photo: { type: String }
})