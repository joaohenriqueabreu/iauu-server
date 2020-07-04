const Artist = require('../../models/artist')
const ArtistService = require('./base')
const BadRequestException = require('../../exception/bad')

module.exports = class SearchArtistProfileService extends ArtistService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      // need to override base with provided data (not the role_id from the user, but the one looking up)      
      this.id = data.id
    }

    async search() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      return this
    }
}
