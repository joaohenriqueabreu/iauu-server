const nodemailer = require('nodemailer');

let transporter = {}

async function start() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lauren.farrell69@ethereal.email',
            pass: 'rfkSczMZx9fx4syD4D'
        },
        tls: {
            rejectUnauthorized: false
        }    
    });
    
}

async function send(to, from, subject, message) {
    console.log('Trying to send email...')
    try {
        const result = await transporter.sendMail({to, from, subject, html: message})    
        console.log('Mail sent...')
        return result
    } catch (error) {
        console.log('Failed sending mail...')
        console.log(error)          
    }        
}

start().catch((error) => {
    throw error
})

module.exports = { send }