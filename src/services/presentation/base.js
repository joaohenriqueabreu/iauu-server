const _ = require('lodash')
const BadRequestException = require('../../exception/bad')
const BaseService = require('../base')
const SendMailService = require('../mail/sendMail')
const CreateNotificationService = require('../notification/createNotification')
const Presentation = require('../../models/presentation')

module.exports = class PresentationService extends BaseService
{
    constructor(user, data) {
      super(user)

      if (data === undefined) {
        throw new BadRequestException('Data is required')
      }

      this.user = user
      this.presentation = {}
    }

    async searchPresentation() {
      this.presentation = await Presentation.findById(this.id)
        .populate({ 
          path: 'contractor',
          populate: { path: 'user' }
        })
        .populate('artist.user')
      return this
    }

    ensurePresentationWasFound() {
      if (Presentation.notFound(this.presentation) || !this.presentation instanceof Presentation) {
        throw new Error('Presentation not found...')
      }
  
      console.log('Presentation found...')
      return this
    }

    async savePresentation() {
      await this.presentation.save()
      return this
    }

    getPresentation() {
      return this.presentation
    }
}
