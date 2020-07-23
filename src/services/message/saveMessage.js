const _ = require('lodash')
const BaseMessageService = require('./base')
const MessageThread = require('../../models/thread')

module.exports = class SaveMessageService extends BaseMessageService
{
  constructor(user, data) {
    super(user, data)

    this.thread = {}
    this.message = data.message
  }

  async save() {
    await this.searchThread()
    await this.createIfFirstMessage()
    await this.isValidMessage()
    await this.appendNewMessage()
    await this.saveMessage()
    return this
  }

  createIfFirstMessage() {
    if (MessageThread.notFound(this.thread)) {
      console.log('Thread not found for presentation...')
      this.thread = new MessageThread({ presentation: this.id })
    }

    console.log('Thread found...')
    return this
  }

  isValidMessage() {
    return this
  }
 
  appendNewMessage() {
    console.log('Appending latest message...')
    this.thread.messages.push(this.message)
    return this
  }

  getLatestMessage() {
    console.log(this.thread)
    console.log(this.thread.messages)
    return _.last(this.thread.messages)
  }
}
