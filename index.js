const express = require('express');
const  {sequelize , user , history , why_join}  = require('./models');
const app =express();
const { checkIfUserExist,checkIfUserVerified  }= require('./utils/validation');
const { generate } = require('./utils/otp');
const http = require('http');
const cors = require('cors');
const { checkIotp }= require('./utils/checkotp')
HttpsProxyAgent = require("https-proxy-agent");
const proxy = process.env.http_proxy || "localhost:3000"; 
const agent = new HttpsProxyAgent(proxy);
const bcrypt = require('bcrypt');


http.createServer(app);

app.use(cors())

app.use(express.json())

app.get('/api/v1/users',async(req,res)=>{
  try{
    
    let data = await user.findAll({
      attributes:{exclude:['createdAt','updatedAt','device','user_id']}
    });
    if(data){
      await res.json({
        UserData : data
      })
    }
    else{
      await res.json({
        status:"fail",
        Reason:"User data is find"
      })
    }


  }
  catch(err){
    console.log('res')
  }
})

app.get('/api/v1/user',async(req,res)=>{
  let {Phone} = req.query;
  try{

    let userData = await user.findOne({
      where:{
        Phone
      }
    })
    if(userData){
    await res.json({
      status:"success",
      userData
    })
  }
else{
  await res.json({
    status:"fail",
    User:"Not Found"
  })
}
  }
  catch(err){
    console.log(err)
    await res.json({
      status:"fail",
      Error:err
    })
  }
})

app.post('/api/v1/register',cors(),async(req,res)=>{
  try{

    let {
      Name,
      email,
      Phone,
     Password,
      time,
      device
    } = req.body;

    let verified = "No";

    let exist = await checkIfUserExist(email);

    if(exist){
      let verify = await checkIfUserVerified(email);
      if(!verify){

        let find = await user.findOne({
          where:{
            email
          }
        })

        await generate(email);

        find.Name = Name;
        find.time = time;
        find.device = device;
        
        await find.save();

        await res.json({
          status:"success",
          Otp_status:"Success",
          User:find
        })
      }
      else{
        await res.json({
          status:"fail",
          Error:"Email address already register"
        })
      }
    }
    else{
     
      let hashedPassword = await bcrypt.hash(Password,10);
      console.log(hashedPassword);
       let User =await user.create( {Name,
        email,
        Phone,
        time,
        device,
        Pasword:hashedPassword,
        verified});

         await generate(email);
        await res.json({
          status:"success",

          User:User,
         
        })
    }

  }
  catch(err){
    console.log(err)
    await res.json({
      status:"fail",
      Error:err
    })
  }
})




app.get('/api/v1/why_join',async(req,res)=>{
    try{

        let data = await why_join.findAll();
        if(data){
            await res.json({
                status:'sucesss',
                why_join:data
            })
    }
    else{
        await res.json({
            status:'fail',
            Reason:'Data is not  present in table'
        })
    }

    }
    catch(err){
        await res.json({
            status:'fail',
            Error:err
        })
    }
})


app.post('/api/v1/add_why_join',async(req,res)=>{
    try{

        let {question , answer } = req.body;
       
    let find = await why_join.findAll({
       
        raw:true,
        attributes:[[sequelize.fn('max',sequelize.col('appearance_order')),'appearance_order']]
    })

    let appearance_order = find[0].appearance_order+1;

        let create = await why_join.create({
            question,answer,appearance_order
        })
        
        await res.json({
            status:'sucess',
            Data:create
        })
    }
    catch(err){
        await res.json({
            status:'fail',
            Error:err
        })
    }
})

app.post('/api/v1/login_affilate',cors(),async(req,res)=>{
    try{

        let { email , password , device , time } = req.body;
    
        
        let check = await checkIfUserExist(email)
        if(!check){
            res.send({status:'fail',msg:'Email address  is not registered'})
        }
        else{
            let verified = checkIfUserVerified(email);
            if(!verified){
                await res.send({status:'fail',msg:'Email address  is not registered'});
            }
        else{

            let User = await user.findOne({
                where: {
                  email
                }
              });
              User.device = device
                
                User.time = time
        
              await User.save();
              let hashedPassword = await bcrypt.compare(password,User.Pasword);
              if(User.email == email && hashedPassword == true){

                res.json({
                  status:"success",
                  Login:"Login sucessfull"
                })

              }
              else{
                res.json({
                  status:"fail",
                  Error:"Please check you Credentials"
                })
              }
            
            }
        }   
    }
    catch(err){
        console.log(err)
        await res.json({
            status:'fail',
            Error:err
        })
    }
})



app.post('/api/v1/verify',async(req,res)=>{
    try{

        const { email, otp } = req.body;
        let check = await checkIotp(email,otp);
        
        if(check){
          check.verified = "Yes";
          await check.save();
          await res.json({
            status:"success",
            Data:check
          })
         
        }
        else{
          res.send({ status: "failure", msg: "Otp is incorrect" });
        }
    }
    catch(err){
      console.log(err)
        await res.json({
            Error:err
        })
    }
})

app.post("/api/v1/resend", async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email)
      const send_otp_status = await generate(email);
      return res.json({ status: send_otp_status });
    } catch (error) {
      console.log(error);
      res.json({
        status: "failure",
      });
    }
  });


  app.post('/api/v1/forget_password',async(req,res)=>{
    try{

      let {email,password} = req.body;

      let User = await user.findOne({
        where:{
          email
        }
      })

      if(User){
        let otp = await generate(email);
        User.otp=otp;
         
        User.Pasword =await bcrypt.hash(password,10);
        await User.save();
        await res.json({
        pass:"Password updated successfully"
        })
      }
      else{
        await res.json({
          status:"fail",
          Reason:"Oops Email address is not found"
        })
      }

    }
    catch(err){
      console.log(err)
      await res.json({
        status:"fail",
        Error:err
      })
    }
  })

Port = process.env.port || 9000;

app.listen(Port,()=>{
    sequelize.authenticate()
    .then(()=>{
        console.log("Database connected");
        console.log('server is running at ' + " " +Port)
    })
    .catch((err)=>{
        console.log(err);
    })
})
