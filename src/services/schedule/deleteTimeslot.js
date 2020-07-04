const _ = require('lodash')
const ArtistService = require('../artist/base')
const BadRequestException = require('../../exception/bad')

module.exports = class DeleteTimeslotService extends ArtistService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.timeslotId = data.id
    }

    async delete() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      await this.ensureTimeslotExists()
      await this.deleteTimeslot()
      await this.saveArtist()
      return this
    }

    ensureTimeslotExists() {
      console.log('Checking if timeslot exists...')
      const self = this
      const index = _.findIndex(this.artist.schedule, (timeslot) => timeslot.id === self.timeslotId)

      if (index === -1) {
        throw new BadRequestException('Invalid timelost')
      }
      
      return this
    }

    async deleteTimeslot() {
      console.log('Deleting timeslot...')
      await this.artist.schedule.pull(this.timeslotId)
      return this
    }
}
