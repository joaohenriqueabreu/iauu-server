const db = require('../data/db')

module.exports = new db.Schema({
    type: {
      type: String,
      enum: ['Point'],      
    },
    coordinates: {
      type: [Number],      
    }
  });
  