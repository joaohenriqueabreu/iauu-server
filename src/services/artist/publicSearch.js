const Artist = require('../../models/artist')
const BaseService = require('../base')
const BadRequestException = require('../../exception/bad')

module.exports = class SearchArtistProfileService extends BaseService
{
    constructor(user, data) {
      super()

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.slug = data.slug
      this.artist = {}
    }

    async search() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      return this
    }

    async lookupArtist() {
      console.log('Searching for artist from slug...')      
      this.artist = await Artist.findOne({ slug: this.slug }).populate('user')
      return this
    }

    ensureArtistWasFound() {      
      if (Artist.notFound(this.artist) || !this.artist instanceof Artist) {
        throw new Error('Artist not found...')
      }
  
      console.log('Artist found...')
      return this
    }

    getArtist() {
      return this.artist
    }
}
