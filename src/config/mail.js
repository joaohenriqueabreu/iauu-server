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
        }
    });
    
}

async function send(to, from, subject, message) {
    const result = await transporter.sendMail({to, from, subject, html: message})
    console.log(result)          
}

start().catch((error) => {
    throw error
})

module.exports = { send }

// module.exports = ({ to, subject, html, from = config.emailFrom }) => {
//     const transporter = nodemailer.createTransport(config.smtpOptions);
//     transporter.sendMail({ from, to, subject, html });
// }