const _ = require('lodash')
const ArtistService = require('./base')

module.exports = class SendFeedbackService extends ArtistService
{
    constructor(user, data) {
      super(user, data)

      this.id = data.id
      this.contractor = user
      this.presentation_id = data.presentation.id
      this.feedback = data.feedback
    }

    async save() {
      await this.lookupArtist()
      await this.ensureArtistWasFound()
      await this.populateFeedback()
      await this.calculateRating()
      await this.saveArtist()
      return this
    }

    populateFeedback() {
      this.artist.feedbacks.push({
        rating: this.feedback.rating,
        notes: this.feedback.notes,
        presentation: this.presentation_id,
        from: {
          name: this.contractor.name,
          photo: this.contractor.photo,
          contractor: this.contractor.id
        },
      })

      return this
    }

    calculateRating() {
      this.artist.rating = _.meanBy(this.artist.feedbacks, 'rating')
      return this
    }
}
