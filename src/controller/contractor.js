'use strict'

const BaseController = require('./base')
const SearchArtistsService = require('../services/artist/searchArtists')

class ContractorController extends BaseController {
  searchArtists(req, res, next) {
    console.log('Searching for artists...')
    const searchArtistsService = new SearchArtistsService(req.data)
    searchArtistsService.search()
      .then(() => { res.status(200).json(searchArtistsService.getArtists()) })
      .catch((error) => next(error))
  }
}

module.exports = new ContractorController()
