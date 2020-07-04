'use strict'

const BaseController = require('./base')
const PublicArtistProfileService = require('../services/artist/publicSearch')
const SearchArtistForProposalService = require('../services/artist/searchArtistForProposal')
const SearchArtistProfileService = require('../services/artist/searchProfile')
const SaveArtistProfileService = require('../services/artist/saveProfile')
const SaveProductService = require('../services/artist/saveProduct')
const DeleteProductService = require('../services/artist/deleteProduct')
const LookupProductsService = require('../services/artist/lookupProducts')

const faker = require('faker')
const { Artist, Product } = require('../seeds')

class ArtistController extends BaseController {
  publicInfo(req, res, next) {    
    console.log("Requesting artist public...")

    const publicArtistProfileService = new PublicArtistProfileService(req.user, req.data)
    publicArtistProfileService.search(req.user, req.data)
      .then(() => { res.status(200).json(publicArtistProfileService.getArtist()) })
      .catch((error) => next(error))
  }

  privateInfo(req, res, next) {    
    console.log("Requesting artist private...")

    const searchArtistForProposalService = new SearchArtistForProposalService(req.user, req.data)
    searchArtistForProposalService.search(req.user, req.data)
      .then(() => { res.status(200).json(searchArtistForProposalService.getArtist()) })
      .catch((error) => next(error))
  }

  profile(req, res, next) {
    console.log("Requesting artist...")
    const searchProfileService = new SearchArtistProfileService(req.user, req.data)
    searchProfileService.search()
      .then(() => { res.status(200).json(searchProfileService.getArtist()) })
      .catch((error) => next(error))    
  }

  updateProfile(req, res, next) {
    console.log("Updating profile...")
    const saveProfileService = new SaveArtistProfileService(req.user, req.data)
    saveProfileService.save()
      .then(() => { res.status(200).json(saveProfileService.getArtist()) })
      .catch((error) => next(error))
  }

  products(req, res, next) {
    console.log("Looking up products...")    
    const lookupProductsService = new LookupProductsService(req.user, req.data)
    lookupProductsService.lookup()
      .then(() => { res.status(200).json(lookupProductsService.getProducts()) })
      .catch((error) => next(error))
    
  }

  saveProduct(req, res, next) {
    console.log('Starting to save product...')
    const saveProductService = new SaveProductService(req.user, req.data)
    saveProductService.save()
      .then(() => { res.status(200).json(saveProductService.getProducts()) })
      .catch((error) => next(error))
  }

  deleteProduct(req, res, next) {    
    const deleteProductService = new DeleteProductService(req.user, req.data)
    deleteProductService.delete()
      .then(() => { res.status(200).json(deleteProductService.getProducts()) })
      .catch((error) => next(error))
  }
}

module.exports = new ArtistController()
