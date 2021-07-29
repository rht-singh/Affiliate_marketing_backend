
const { sequelize, user } = require('./../models')
const nodemailer = require('nodemailer')




  
const sendOTP = async(email,otp)=>{
try{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure:false,
    auth: {
      user: 'wbdeveloper80@gmail.com',
      pass: 'not7Th!s'
    }
    ,tls:{
      rejectUnauthorized:false,
      
    }
    
  });
  
  var mailOptions = {
    from: 'wbdeveloper80@gmail.com',
    to: email,
    subject: "Otp from Affilator's",
    text: `Here is you ${otp} .Please Don't share it with anyone`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  let data = await user.findOne({
    where:{
      email
    }
  })
  data.otp=otp;
  await data.save();
  console.log('success');
}
catch(err){
  console.log(err);
}

 
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