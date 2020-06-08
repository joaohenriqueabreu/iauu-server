const BaseService = require('./base')
const nodemailer  = require('nodemailer')
const config      = require('@/config/mail')

module.exports = class SendMailService extends BaseService {
  constructor(to, subject, html, from) {
    this.to = to
    this.subject = subject
    this.html = html
    this.from = from || config.emailFrom
  }

  send() {
    const transporter = nodemailer.createTransport(config.smtpOptions)    
    transporter.sendMail({ from: this.from, to: this.to, subject: this.subject, html: this.html });
  }
}