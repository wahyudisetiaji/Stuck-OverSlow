const kue = require('kue')
const queue = kue.createQueue()
const nodemailer = require('nodemailer')
const CronJob = require('cron').CronJob

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
          user: 'todows666@gmail.com',
          pass: 'sportident17'
  }
})

new CronJob('30 * * * * *', function() {
  let job = queue.process('email', (job, done) => {
    sendMail(job.data, done)
  })
}, null, true, 'Asia/Jakarta');

function sendMail(emailOptions, done) {
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log(info)
      done()
    }
  })
}
