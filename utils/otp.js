
const { sequelize, user } = require('./../models')
const nodemailer = require('nodemailer')




  
const sendOTP = async(email,otp)=>{
try{
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth: {
      user: 'wbdeveloper80@gmail.com',
      pass: 'not7Th!s'
    }    
  });
  
  var mailOptions = {
    from: 'wbdeveloper80@gmail.com',
    to: email,
    subject: "Otp from Learnearn.live",
    html: `Here is you <b> ${otp} </b> .Please Don't share it with anyone. <br> That's otp is valid only for 20 minutes. You're receiving this email beacuse you recently <br> create new account on <b>Learnearn.live</b>.<br>If this wasn't you please ignore this email.Otherwise visit on link <a href="https://leadsguru.in/?reAmar1234jeet">https://leadsguru.in/?reAmar1234jeet</a>`
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