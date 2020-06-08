const { Schema } = require('../config/db')

module.exports = class BaseModel {
  constructor() {
    this.pre('save', handleValidate)
    this.post('save', handleSave)
  }

  static async findById(id) {
    const { error, model } = await this.findOne({id})
    return this.handleQuery(error, model)
  } 
  
  static async fetch(data) {
    const {error, model} = await this.find(data)
    return this.handleQuery(error, model)    
  }

  handleQuery(error, model) {
    if (error !== undefined) {
      throw new Error('Model not found')
    }

    return model
  }

  handleValidate(next) {
    console.log('we are handling')
    next()
  }

  handleSave(error, model, next) {
    console.log('it tried to save')
    next()
  }
}