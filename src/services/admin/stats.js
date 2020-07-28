const BaseService = require('../base')
const { User, Artist, Contractor, Presentation } = require('../../models')

module.exports = class StatsService extends BaseService
{
    constructor() {
      super()
      this.stats = {}
    }

    async retrieve() {
      await this.calculateUserStats()
      await this.calculatePresentationStats()
      await this.calculatePaymentStats()
      return this
    }

    async calculateUserStats() {
      this.stats.users = {}
      // this.stats.users = await User.aggregate([
      //   { $group: { "_id": "$role", count: { $sum: 1 }} }
      // ])
      
      this.stats.users = await User.aggregate([]).facet({
        all: [{ $match: {} }, { $count: "count" }],
        artists: [{ $match: { role: 'artist'} }, { $count: "count" }],
        contractors: [{ $match: { role: 'contractor'} }, { $count: "count" }]
      })

      return this
    }

    async calculatePresentationStats() {
      return this
    }

    async calculatePaymentStats() {
      return this
    }

    getStats() {
      return this.stats
    }
}
