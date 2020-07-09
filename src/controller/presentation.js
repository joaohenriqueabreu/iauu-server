'use strict'

const BaseController = require('./base')
const SaveProposalService = require('../services/presentation/saveProposal')
const SearchPresentationService = require('../services/presentation/searchPresentation')
const SelectTimeslotService = require('../services/presentation/selectTimeslot')

class PresentationController extends BaseController {
  saveProposal(req, res, next) {
    console.log('Starting to save proposal...')
    const saveProposalService = new SaveProposalService(req.user, req.data)
    saveProposalService.save()
      .then(() => { res.status(200).json({}) })
      .catch((error) => next(error))
  }

  search(req, res, next) {
    console.log('Searching proposal...')
    const searchPresentationService = new SearchPresentationService(req.user, req.data)
    searchPresentationService.search()
      .then(() => { res.status(200).json(searchPresentationService.getPresentation()) })
      .catch((error) => next(error))
  }

  selectTimeslot(req, res, next) {
    console.log('Updating timeslot...')
    const selectTimeslotService = new SelectTimeslotService(req.user, req.data)
    selectTimeslotService.select()
      .then(() => { res.status(200).json(selectTimeslotService.getPresentation()) })
      .catch((error) => next(error))
  }
}

module.exports = new PresentationController()
