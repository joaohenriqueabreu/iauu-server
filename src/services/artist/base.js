const Artist = require('../../models/artist')
const BaseService = require('../base')

module.exports = class ArtistService extends BaseService
{
    constructor() {
      super()      
      this.artist = {}
    }

    getArtist() {
      return this.artist
    }
}
