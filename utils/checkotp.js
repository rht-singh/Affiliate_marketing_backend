const { user } = require("../models");

let checkIotp = async (email, otp) => {
try{
  return  user.findOne({
    where: {
      email,
      otp
    }
  });
 
 
}
catch(err){
    return err
}
}
module.exports = {
  checkIotp
}