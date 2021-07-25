const { user } = require('../models');


let checkIfUserExist = async (email)=>{
 return user.findOne({
     where:{
         email
     }
 });
};

let checkIfUserVerified = async (email)=>{
   return  user.findOne({
        where:{
            email,
            verified:'Yes'
        }
    });
};

module.exports = {
    checkIfUserExist,
    checkIfUserVerified
}