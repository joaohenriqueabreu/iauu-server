const Artist = require('../../models/artist')
const BaseService = require('../base')
const BadRequestException = require('../../exception/bad')

module.exports = class SearchScheduleService extends BaseService
{
    constructor(user, data) {
      super()

      if (data === undefined || data.id === undefined) {
        throw new BadRequestException('Target schedule id is required')
      }

      this.id = data.id
      this.artist = {}

      this.year = data !== undefined && data.year !== undefined ? data.year : new Date().getFullYear()
      this.schedule = []      
    }

    async search() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      await this.populateYearSchedule(this.year)
      return this
    }

    async lookupArtist() {
      console.log('Searching for artist...')
      this.artist = await Artist.findById(this.id)
      return this
    }

    ensureArtistWasFound() {
      if (Artist.notFound(this.artist) || !this.artist instanceof Artist) {
        throw new BadRequestException('Artist not found...')
      }
  
      console.log('Artist found...')
      return this
    }

    populateYearSchedule() {
      // do nothing for now
      console.log(`Searching for ${this.year} schedule...`)
      this.schedule = [...this.schedule, ...this.artist.schedule]
      return this
    }

    getSchedule() {
      return this.schedule
    }
}
