const BaseService = require('../base')
const fs = require('fs')
const mailer = require('nodemailer')
const mustache = require('mustache')

module.export = class SendMailService extends BaseService {
    constructor(to, subject, template, data) {
      super()

      this.to = to
      this.from = 'admin@iauu.com.br'
      this.subject = subject
      this.html = mustache.render(fs.readFile(`../../mail/${template}.js`), data)
    }  

    sendMail() {
      mailer.send(this.to, this.from, this.subject, this.html)
    }    
}