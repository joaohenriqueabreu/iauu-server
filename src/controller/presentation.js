'use strict'

const BaseController = require('./base')


class PresentationController extends BaseController {
  saveProposal(req, res, next) {
    console.log('Starting to save product...')
    const saveProposalService = new SaveProposalService(req.user, req.data)
    saveProposalService.save()
      .then(() => { res.status(200).json({}) })
      .catch((error) => next(error))
  }
}

module.exports = new PresentationController()
