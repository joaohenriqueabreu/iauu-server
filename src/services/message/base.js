const BaseService = require('../base')
const BadRequestException = require('../../exception/bad')
const MessageThread = require('../../models/thread')

module.exports = class BaseMessageService extends BaseService
{
    constructor(user, data) {
      super(user)

      if (data === null || data === undefined) {
        throw new BadRequestException('Presentation required to search for message thread')
      }

      this.id = data.id
      this.thread = {}
    }

    async get() {
      await this.searchThread()
      return this
    }

    async searchThread() {
      console.log('Searching presentation message thread...')
      this.thread = await MessageThread.findOne({ presentation: this.id })
      return this
    }

    async saveMessage() {
      await this.thread.save()
      return this
    }
}
