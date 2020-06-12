const BaseService = require('../base')
const fs = require('fs')
const mailer = require('../../config/mail')
const mustache = require('mustache')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)

module.exports = class SendMailService extends BaseService {
    constructor(to, subject, template, data) {
      super()

      this.to = to
      this.from = 'admin@iauu.com.br'
      this.subject = subject            
    }  

    async buildBody(template, data) {      
      try {
        const fileContent = await readFileAsync(`/usr/app/src/mails/${template}.html`, 'utf8')             
        const html        = mustache.render(fileContent, data)

        console.log('Rendering mail template...')        
        this.html = html                
        
        console.log('Finished reading file...')
        return this
      } catch (error) {
        console.log('Failed rendering file...')
        console.log(error)
        throw error
      }
    }

    async send() {
      console.log('Starting send mail...')      
      await mailer.send(this.to, this.from, this.subject, this.html)
    }    
}