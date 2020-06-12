const db = require('../data/db');
const BaseModel = require('./base')

const { Schema } = db

const userSchema = new Schema({
  email:              { type: String, unique: true, required: true },
  password:           { type: String, required: true },
  role:               { type: String, required: true, enum: ['artist', 'contractor', 'admin'] },
  name:               { type: String, required: true },
  access_token:       { type: String, required: true },
  title:              { type: String },  
  first_name:         { type: String },
  last_name:          { type: String },
  accept_terms:       { type: Boolean },
  role:               { type: String },  
  verification_token: { type: String },
  is_verified:        { type: Boolean, default: false },
  reset_token:        { type: String },
  reset_token_expiry: { type: Date },
  date_created:       { type: Date, default: Date.now },
  date_updated:       { type: Date }
})

// Schema.set('toJSON', {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//       // remove these props when object is serialized
//       delete ret._id;
//       delete ret.password;
//   }
// });

class User extends BaseModel {
  constructor() {
    super()    
  }

  static findFromCredentials({email, password}) {
    return this.findOne({email, password})
  }

  generateVerificationUrl() {
    // TODO use dynamic hostname
    return `http://localhost:8080/register/verify/${this.verification_token}`
  }
}

// https://mongoosejs.com/docs/api.html#schema_Schema-loadClass
userSchema.loadClass(User)
module.exports = db.model('User', userSchema);