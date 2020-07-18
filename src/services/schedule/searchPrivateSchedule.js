const _ = require('lodash')
const Presentation = require('../../models/presentation')
const SearchScheduleService = require('./searchSchedule')

module.exports = class SearchPrivateScheduleService extends SearchScheduleService
{
  constructor(user, data) {
    // data = {}
    data.id = user.role_id
    super(user, data)

    this.presentations = []
    this.proposals = []
    
    if (data.status === undefined) {
      this.status = ['proposal', 'accepted']
    } else {
      this.status = data.status
    }
  }

  async search() {
    await this.lookupArtist()
    await this.ensureArtistWasFound()
    await this.lookupPresentations()
    await this.populateProposalSchedule()
    await this.populatePresentationSchedule()
    await this.populateYearSchedule(this.year)
    return this
  }

  async lookupPresentations() {
    this.presentations = await Presentation.find({ artist: this.artist.id, status: { $in: this.status }})
    return this
  }

  populateProposalSchedule() {
    const proposals = _.filter(this.presentations, (presentation) => presentation.status === 'proposal')

    // Add presentation id info for every timeslot, so we can query it back
    const proposalTimeslots = _.map(proposals, 'proposal.timeslots')

    this.schedule = _.flatten([...this.schedule, ...proposalTimeslots])    
    return this
  }

  populatePresentationSchedule() {
    const presentations = _.filter(this.presentations, (presentation) => ['accepted', 'completed', 'cancelled'].includes(presentation.status))
    const presentationTimeslots = _.map(presentations, 'timeslot')

    this.schedule = [...this.schedule, ...presentationTimeslots]
    return this
  }
}
