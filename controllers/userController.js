const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

// GET USER INFO
const getUserController = async(req,res)=>{
        try {
            const user = await userModel.findById({_id:req.body.id});
            if(!user) return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
            // hide password
            user.password = undefined;
            res.status(200).send({
                success:true,
                message:'User Data Fetched Sucessfuly',
                user,
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).send({success:false,
                message:'Error in Get User API',
                error
            })
        }
}


// UPDATE USER
const updateUserController = async(req,res)=>{
   try {
    //   find user
      const user = await userModel.findById({_id:req.body.id});

      if(!user) return res.status(404).send({success:false, message:'User not found'});

    //   update
    const {name, phone, address} = req.body;
    if(user) user.name = name;
    if(address) user.address = address;
    if(phone) user.phone = phone;

    // save user
    await user.save();
    
    res.status(200).send({success:true, message:'User Updated Sucessfully'})

   } catch (error) {
     console.log(error);
     res.status(500).send({
        success:false,
        message:'Error In Update User API',
        error,
     })
   }
}

// UPDATE PASSWORD
const updatePasswordController = async(req,res)=>{
    try {

        // find user
         const user = await userModel.findById({_id:req.body.id});
         if(!user) return res.status(500).send({success:false, message:"User Not Found"})
    
        //get data from user
        const {oldPassword, newPassword} = req.body; 
        if(!oldPassword || !newPassword) return res.status(500).send({success:false, message:'Please provide old and new password'})
        
        //compare password
        const isMatch =  await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return res.status(500).send({success:false, message:"Invalid old password"});


         //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;

        await user.save();

        res.status(200).send({success:true, message:'Password Updated'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error in Password Update API', error})
    }

}


// RESET PASSWORD
const resetPasswordController = async(req,res)=>{
    try {
        const {email, newPassword, answer} = req.body;

        if(!email || !newPassword || !answer) return res.status(500).send({success:false, message:'Please provide all feild'});

        const user = await userModel.findOne({email, answer});

        if(!user) return res.status(500).send({success:false, message:'User Not Found or invalid answer '})

         //hashing password
         var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;

        // save
        await user.save();

        res.status(200).send({success:true, message:'Password reset sucessful'})


    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:"Error in Password RESET API"}, error)
    }
    
}

// DELETE USER
const deleteProfileController = async(req,res)=>{
   try {
       const id = req.params.id;

       await userModel.findByIdAndDelete(id);

        return res.status(200).send({success:true, message:'Your Account has been deleted'})
    
   } catch (error) {
      console.log(error);
      res.status(500).send({success:false,
        message:'Error in delete profile API',
        error,
      })
   }
}
module.exports = {getUserController, updateUserController, updatePasswordController,resetPasswordController, deleteProfileController}