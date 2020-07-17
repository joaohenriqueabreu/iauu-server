'use strict'

const BaseController = require('./base')
const SaveProposalService = require('../services/presentation/saveProposal')
const SearchPresentationService = require('../services/presentation/searchPresentation')
const SelectTimeslotService = require('../services/presentation/selectTimeslot')
const AcceptProposalService = require('../services/presentation/acceptProposal')
const RejectProposalService = require('../services/presentation/rejectProposal')
const SendCounterOfferService = require('../services/presentation/sendCounterOffer')
const AcceptCounterOfferService = require('../services/presentation/acceptCounterOffer')
const RejectCounterOfferService = require('../services/presentation/rejectCounterOffer')

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

  sendCounterOffer(req, res, next) {
    console.log('Updating timeslot...')
    const sendCounterOfferService = new SendCounterOfferService(req.user, req.data)
    sendCounterOfferService.send()
      .then(() => { res.status(200).json(sendCounterOfferService.getPresentation()) })
      .catch((error) => next(error))
  }

  acceptCounterOffer(req, res, next) {
    console.log('Updating timeslot...')
    const acceptCounterOfferService = new AcceptCounterOfferService(req.user, req.data)
    acceptCounterOfferService.send()
      .then(() => { res.status(200).json(acceptCounterOfferService.getPresentation()) })
      .catch((error) => next(error))
  }

  rejectCounterOffer(req, res, next) {
    console.log('Updating timeslot...')
    const rejectCounterOfferService = new RejectCounterOfferService(req.user, req.data)
    rejectCounterOfferService.send()
      .then(() => { res.status(200).json(rejectCounterOfferService.getPresentation()) })
      .catch((error) => next(error))
  }

  acceptProposal(req, res, next) {
    console.log('Accepting proposal...')
    const acceptProposalService = new AcceptProposalService(req.user, req.data)
    acceptProposalService.reply()
      .then(() => { res.status(200).json(acceptProposalService.getPresentation()) })
      .catch((error) => next(error))
  }

  rejectProposal(req, res, next) {
    console.log('Rejecting proposal...')
    const rejectProposalService = new RejectProposalService(req.user, req.data)
    rejectProposalService.reply()
      .then(() => { res.status(200).json(rejectProposalService.getPresentation()) })
      .catch((error) => next(error))
  }
}

module.exports = new PresentationController()
