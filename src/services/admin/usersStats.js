const _ = require('lodash')
const moment = require('moment')
const BaseService = require('../base')
const { User } = require('../../models')

module.exports = class UserStatsService extends BaseService
{
    constructor(year) {
      super()
      this.stats = {}
    }

    async retrieve() {
      await this.calculateStats()
      return this
    }

    async calculateStats() {
      const startOfYear = new Date(moment().startOf('year').toISOString())
      this.stats = await User.aggregate([{ $match: { created_at: { $gte: startOfYear }} }]).facet({
        all: [{ $group: { _id: "", count: { $sum: 1 } }}],
        status: [{ $group: { _id: "$status", count: { $sum: 1 } }}],
        roles: [{ $group: { _id: "$role", count: { $sum: 1 } }}],
        daily: [{ $addFields: { createdDate: {$dateToString: { format: "%Y-%m-%d", date: "$created_at" }} }}, { $group: { _id: "$createdDate", count: { $sum: 1 } }}]
      }) 

      return this
    }

    getStats() {
      return this.stats
    }
}
