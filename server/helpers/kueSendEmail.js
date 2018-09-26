const kue = require('kue')
const queue = kue.createQueue()

kue.app.listen(3001)

module.exports = {
  dataRegister(email) {
    let emailOptions =  {
        from: "todows666@gmail.com",
        to: `${email}`,
        subject: `Welcome to Stuck-OverSlow`,
        text: 
        `Welcome to Stuck-OverSlow
Where Developers Learn, Share, & Build Careers 
https://stuck-overslow.wahyudisetiaji.xyz

Thanks for register ! :)`
    }

    queue.create('email', emailOptions).save( function(err){
      if( !err ) {
        console.log('Job created!')
      }
    })
  }
}