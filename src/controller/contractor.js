'use strict'

const BaseController = require('./base')
const SearchArtistsService = require('../services/artist/searchArtists')
const SearchContractorProfileService = require('../services/contractor/searchProfile')
const SaveContractorProfileService = require('../services/contractor/saveProfile')

class ContractorController extends BaseController {
  searchArtists(req, res, next) {
    console.log('Searching for artists...')
    const searchArtistsService = new SearchArtistsService(req.data)
    searchArtistsService.search()
      .then(() => { 
        res.status(200).json(searchArtistsService.getArtists()) 
      })
      .catch((error) => next(error))
  }

  profile(req, res, next) {
    console.log("Requesting contractor profile...")
    const searchProfileService = new SearchContractorProfileService(req.user, req.data)
    searchProfileService.search()
      .then(() => { res.status(200).json(searchProfileService.getContractor()) })
      .catch((error) => next(error))    
  }

  updateProfile(req, res, next) {
    console.log("Updating profile...")
    const saveProfileService = new SaveContractorProfileService(req.user, req.data)
    saveProfileService.save()
      .then(() => { res.status(200).json(saveProfileService.getContractor()) })
      .catch((error) => next(error))
  }
}

module.exports = new ContractorController()
