const nodemailer = require('nodemailer')
const { query  } = require('../models');



  
const sendOTP = async(email,Name,query)=>{
try{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    secure:true,
    auth: {
      user: 'wbdeveloper80@gmail.com',
      pass: 'not7Th!s'
    }
    ,tls:{
      rejectUnauthorized:true,
      
    }
    
  });
  
  var mailOptions = {
    from: 'wbdeveloper80@gmail.com',
    to: email,
    subject: "learnearn.live Affiliate_Marketing Team",
    html: `Hi ! ${Name} . We got an mail from you. We will conact you as soon as possible.<br>. Please correct me.if I am wrong your query is <br> ${query}<br> Sir/Mam Please wait we are coming with effective solution. <br> Thank you <br> visit <a href="https://learnearn.live">learnearn.live</a>`
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


  const send = async (email,Name,query) => {
    const send_otp_status = await sendOTP(email,Name,query);
    return send_otp_status
  };


module.exports = {
    
    send

}