const _ = require('lodash')
const ArtistService = require('../artist/base')
const BadRequestException = require('../../exception/bad')

module.exports = class SaveProductService extends ArtistService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.timeslot = data.timeslot
      this.index = 0
    }

    async save() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      await this.populateTimeslot()
      await this.saveArtist()
      return this
    }

    populateTimeslot() {
      console.log('Checking if timeslot exists...')
      const self = this
      this.index = _.findIndex(this.artist.schedule, (timeslot) => timeslot.id === self.timeslot.id)

      if (this.index > -1) {
        this.artist.schedule[index] = this.timeslot
        return this
      }

      this.artist.schedule.push(this.timeslot)
      this.index = this.artist.schedule.length - 1
      return this
    }

    getTimeslot() {
      return this.artist.schedule[this.index]
    }
}
