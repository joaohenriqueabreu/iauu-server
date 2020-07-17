const _ = require('lodash')
const Artist = require('../../models/artist')
const Presentation = require('../../models/presentation')
const BaseService = require('../base')
const BadRequestException = require('../../exception/bad')
const presentation = require('../../models/presentation')

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
      this.presentations = []
    }

    async search() {
      await this.lookupArtist()
      await this.lookupPresentations()
      await this.ensureArtistWasFound()
      await this.populateYearSchedule(this.year)
      await this.populateScheduleWithPresentations()
      return this
    }

    async lookupArtist() {
      console.log('Searching for artist...')
      this.artist = await Artist.findById(this.id)
      return this
    }

    async lookupPresentations() {
      console.log('Searching for artist presentations')
      this.presentations = await Presentation.find({ artist: this.id, status: 'accepted' })
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

    populateScheduleWithPresentations() {
      const presentationTimeslots = _.map(this.presentations, 'timeslot')

      this.schedule = [...this.schedule, ...presentationTimeslots]
      return this
    }

    getSchedule() {
      return this.schedule
    }
}
