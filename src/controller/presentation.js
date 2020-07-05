'use strict'

const BaseController = require('./base')
const SaveProposalService = require('../services/presentation/saveProposal')

class PresentationController extends BaseController {
  saveProposal(req, res, next) {
    console.log('Starting to save proposal...')
    const saveProposalService = new SaveProposalService(req.user, req.data)
    saveProposalService.save()
      .then(() => { res.status(200).json({}) })
      .catch((error) => next(error))
  }
}

module.exports = new PresentationController()
