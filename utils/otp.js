
const { sequelize, user } = require('./../models')
const nodemailer = require('nodemailer')


let getOTP = async()=>{
    let otp = Math.random();
    otp = otp * 1000000>>0;
  
    return otp;
  }

  
const sendOTP = async(email,otp)=>{




  let transporter = nodemailer.createTransport({
    host: "165.22.220.190",
    service:"gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "wbdeveloper80@gmail.com", // generated ethereal user
      pass: "not7Th!s", // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Affilate_Marketing" <wbdeveloper80@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Otp from Affilate_Marketer", // Subject line
    text: "<b>Hello world?</b>" , // plain text body
    html: `Here is you Otp ${otp}.Please dont't share it with anyone.This otp is valid for 10min.`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  console.log("otp sent successfully " + " " +otp);
  let Data = await user.findOne({
    where:{
      email
    }
  })
  if(Data){
    Data.otp = otp;
    await Data.save();
  }

return "sucess";

};


  const generate = async (email) => {
    const otp =  await getOTP();
  
    console.log(otp)
    const send_otp_status = await sendOTP(email,otp);
    return send_otp_status
  };


module.exports = {
    
    generate

}