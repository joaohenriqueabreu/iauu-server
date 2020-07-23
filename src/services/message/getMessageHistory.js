const BaseMessageService = require('./base')

module.exports = class GetMessageHistoryService extends BaseMessageService
{
  constructor(user, data) {
    super(user, data)
    this.thread = {}
  }

  async get() {
    await this.searchThread()
    return this
  }

  getMessages() {
    if (this.thread !== null && this.thread !== undefined) {
      return this.thread.messages
    }

    return 
  }
}
