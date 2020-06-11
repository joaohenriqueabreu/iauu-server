const db = require('../data/db')

module.exports = class BaseModel {
  constructor(schema) {
    if (this.constructor === BaseModel) { throw new TypeError('Cannot construct abstract class') }
  }

  static async findById(id) {
    const { error, model } = await this.findOne({id})
    return this.handleQuery(error, model)
  } 
  
  static async fetch(data) {    
    return this.find(data, this.handleQuery)    
  }

  static async fetchOne(data) {
    return this.findOne(data, this.handleQuery)
  }

  static handleQuery(error, models) { 
    if (error !== undefined && error !== null) {      
      throw new Error('Model not found')
    }

    return models
  }

  handleValidate(next) {
    console.log('we are handling')
    next()
  }

  handleSave(error, model, next) {
    console.log('it tried to save')
    next()
  }

  handleError(a, b, c, d) {
    console.log('opsy')
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
  }

  static notFound(model) {
    if (model === undefined || model === null || model === [] || model.length === 0) {
      return true
    } 

    return model instanceof db.Types.ObjectId
  }
}