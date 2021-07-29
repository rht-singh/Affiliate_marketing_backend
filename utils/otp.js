
const { sequelize, user } = require('./../models')
const nodemailer = require('nodemailer')




  
const sendOTP = async(email,otp)=>{

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wbdeveloper80@gmail.com',
      pass: 'not7Th!s'
    }
  });
  
  var mailOptions = {
    from: 'wbdeveloper80@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


 
};


  const generate = async (email) => {
    const otp = await Math.random()*1000000>>0;
  
    console.log(otp)
    const send_otp_status = await sendOTP(email,otp);
    return send_otp_status
  };


module.exports = {
    
    generate

}