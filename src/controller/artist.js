'use strict'

const BaseController = require('./base')
const SearchArtistProfileService = require('../services/artist/searchProfile')
const SaveArtistProfileService = require('../services/artist/saveProfile')
const SaveProductService = require('../services/artist/saveProduct')
const LookupProductsService = require('../services/artist/lookupProducts')

const faker = require('faker')
const { Artist, Product } = require('../seeds')

class ArtistController extends BaseController {
  publicInfo(req, res, next) {
    console.log("Requisting artists")
    console.log(req.params.id)

    // Checking if we are receiving a bearer token
    console.log(req.headers)

    let artist = new Artist(true)

    artist.products = []
    for (let i =0; i < faker.random.number(4)+ 1; i++) {
        artist.products.push(new Product())
    }

    res.status(200).json(artist)
  }

  privateInfo(req, res, next) {
    console.log("Requisting artists")
    console.log(req.params.id)

    // Checking if we are receiving a bearer token
    console.log(req.headers)

    let artist = new Artist(true)

    artist.products = []
    for (let i =0; i < faker.random.number(4)+ 1; i++) {
        artist.products.push(new Product())
    }

    res.status(200).json(artist)
  }

  profile(req, res, next) {
    console.log("Requesting artist...")    

    const searchProfileService = new SearchArtistProfileService(req.user.id)
    searchProfileService.search()
      .then(() => { res.status(200).json(searchProfileService.getArtist()) })
      .catch((error) => next(error))    
  }

  updateProfile(req, res, next) {
    console.log("Updating profile...")
    const saveProfileService = new SaveArtistProfileService(req.data)
    saveProfileService.save()
      .then(() => { res.status(200).json(saveProfileService.getArtist()) })
      .catch((error) => next(error))
  }

  products(req, res, next) {
    console.log("Looking up products...")    
    const lookupProductsService = new LookupProductsService(req.data && req.data.id ? req.data.id : req.user.id)
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

  categories(req, res, next) {
    res.status(200).json([
        {id: faker.random.number(100), name: 'banda'}, 
        {id: faker.random.number(100), name: 'DJ'}, 
        {id: faker.random.number(100), name: 'teatro'}, 
        {id: faker.random.number(100), name: 'circo'}, 
        {id: faker.random.number(100), name: 'standup'}, 
        {id: faker.random.number(100), name: 'outros'}, 
    ])
  }

  subcategories(req, res) {
    let subcategories = []
    for(let i=0;i<faker.random.number(10); i++) {
        subcategories.push({id: faker.random.number(1000), name: faker.commerce.product()})
    }
  
    res.status(200).json(subcategories)
  }
}

module.exports = new ArtistController()
