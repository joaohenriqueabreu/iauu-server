'use strict'

const BaseController = require('./base')
const SearchProfileService = require('../services/artist/searchProfile')

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

    const searchProfileSvc = new SearchProfileService(req.user.id)
    searchProfileSvc
      .search()
      .then(() => {
        res.status(200).json(searchProfileSvc.getArtist())
      })
      .catch((error) => next(error))    
  }

  updateProfile(req, res, next) {
    console.log("Updating profile...")
  }

  save(req, res, next) {

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
