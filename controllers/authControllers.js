const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// REGISTER
const registerController = async (req,res)=>{
    try {
        const {name, email, password, phone, address } = req.body;
        // validation
        if(!name || !email || !password || !phone || !address) 
             return res.status(500).send({
               success:false,
               message: 'Please provide all fields'
            });

    // check user
       const existing = await userModel.findOne({email});
       if(existing){
          return res.status(500).send({
             success:false,
             message:'Email already exist, Please Login'
          })
       }

    //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password,salt);

    //    create new user
     const user = await userModel.create({name,email, password:hashedPassword, address,phone});
         res.status(201).send({
           success:true,
            message:'Sucessfully registered',
            user,
       })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message:'Error in register API', error})
    }

}

// LOGIN
const loginController = async (req,res)=>{
   try {
       const {email, password} = req.body;
    //    validation
    if(!email || !password) return res.status(500).send({success:false, message:"Provide Email or password"});

    // checlk user
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).send({success:false, message:"User not found"});
    }

    // check user password | compare password
     const isMatch = await bcrypt.compare(password, user.password)
     if(!isMatch) return res.status(500).send({success:false, message:'Invalid credentails'})
    
    // token created via jwt token
    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

    //   hide password in response data which is showed on screen
    user.password = undefined;

    res.status(200).send({
        success:true,
        message:"Login Sucessfully",
        token,
        user,
    })
    
   } catch (error) {
     console.log(error);
     res.status(500).end({success:false, message:'error in login api', error})
   }
}

module.exports = {registerController, loginController}