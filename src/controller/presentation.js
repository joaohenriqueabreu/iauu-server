'use strict'

const BaseController = require('./base')
const SearchProposalsService = require('../services/presentation/searchProposals')
const SearchPresentationsService = require('../services/presentation/searchPresentations')
const SearchPresentationService = require('../services/presentation/searchPresentation')
const SaveProposalService = require('../services/presentation/saveProposal')
const SelectTimeslotService = require('../services/presentation/selectTimeslot')
const AcceptProposalService = require('../services/presentation/acceptProposal')
const RejectProposalService = require('../services/presentation/rejectProposal')
const SendCounterOfferService = require('../services/presentation/sendCounterOffer')
const AcceptCounterOfferService = require('../services/presentation/acceptCounterOffer')
const RejectCounterOfferService = require('../services/presentation/rejectCounterOffer')
const CompletePresentationService = require('../services/presentation/completePresentation')
const CancelPresentationService = require('../services/presentation/cancelPresentation')

class PresentationController extends BaseController {
  searchProposals(req, res, next) {
    console.log('Searching proposals...')
    const searchProposalsService = new SearchProposalsService(req.user, req.data)
    searchProposalsService.search()
      .then(() => { res.status(200).json(searchProposalsService.getPresentations()) })
      .catch((error) => next(error))
  }

  searchPresentations(req, res, next) {
    console.log('Searching presentations...')
    const searchPresentationsService = new SearchPresentationsService(req.user, req.data)
    searchPresentationsService.search()
      .then(() => { res.status(200).json(searchPresentationsService.getPresentations()) })
      .catch((error) => next(error))
  }

  search(req, res, next) {
    console.log('Searching proposal...')
    const searchPresentationService = new SearchPresentationService(req.user, req.data)
    searchPresentationService.search()
      .then(() => { res.status(200).json(searchPresentationService.getPresentation()) })
      .catch((error) => next(error))
  }

  saveProposal(req, res, next) {
    console.log('Starting to save proposal...')
    const saveProposalService = new SaveProposalService(req.user, req.data)
    saveProposalService.save()
      .then(() => { res.status(200).json({}) })
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
    acceptCounterOfferService.reply()
      .then(() => { res.status(200).json(acceptCounterOfferService.getPresentation()) })
      .catch((error) => next(error))
  }

  rejectCounterOffer(req, res, next) {
    console.log('Updating timeslot...')
    const rejectCounterOfferService = new RejectCounterOfferService(req.user, req.data)
    rejectCounterOfferService.reply()
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

  completePresentation(req, res, next) {
    console.log('Confirming presentation...')
    const completePresentationService = new CompletePresentationService(req.user, req.data)
    completePresentationService.complete()
      .then(() => { res.status(200).json(completePresentationService.getPresentation()) })
      .catch((error) => next(error))
  }

  cancelPresentation(req, res, next) {
    console.log('Cancelling presentation...')
    const cancelPresentationService = new CancelPresentationService(req.user, req.data)
    cancelPresentationService.cancel()
      .then(() => { res.status(200).json(cancelPresentationService.getPresentation()) })
      .catch((error) => next(error))
  }
}

module.exports = new PresentationController()
