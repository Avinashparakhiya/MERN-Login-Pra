const express = require('express');
const route = express.Router();
const userModel = require('../models/student');
var mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken');



// route.get('/studentDetails', async (req, res) => {
//   const user = new userModel.findOne({});

//   try {
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


route.post('/studentRegistration', async (req, res) => {
 
  const exitingUser = await userModel.findOne({ email:req.body.email });
  if (exitingUser) {
    return res.status(400).send({message:'Your Are Already Registration Please Login'});
  } else {
    try {
      const salt= await bcrypt.genSalt(Number(10));
      const hasePassword=await bcrypt.hash(req.body.password,salt)

      const user= await new userModel({...req.body,password:hasePassword})
      const token=await user.generateAuthToken();
      res.cookie("jwt",token,{
        expires:new Date(Date.now()+50000),
        httpOnly:true,
      });
      console.log('*** Student Registration Successfully ***');
      res.send({message:'Student Registration Successfully'});
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

route.post('/login',async (req, res) => {
  try{const email = req.body.email
  const password = req.body.password

  const useremail=await userModel.findOne({email:email})
  const ismatch=await bcrypt.compare(password,useremail.password);

  const token=await useremail.generateAuthToken();

  res.cookie("jwt",token,{
    expires:new Date(Date.now()+500000),
    httpOnly:true,
  })
 if(ismatch)
 {
   res.status(201).send({message:"Successfully Login"})
 }else{
   res.send({message:"Invalid Password Details"})
 }
}catch(error){
res.status(400).send({message:"Invalid Login Details"})
}

})




module.exports=route;
