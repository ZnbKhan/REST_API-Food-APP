// CREATE RESTAURANT

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async(req,res)=>{
   try {
    
        const {
            title,
             imageUrl, 
             foods, 
             time, 
             pickup, 
             delivery, 
             isopen, 
             logoUrl, 
             ratingCount, 
             code,
             coords,
             } = req.body;

            // validation
            if(!title || !coords) return res.status(500).send(
                {success:false, 
                message:'Please prove title and Address'
            }) 

            const newRestuarnt = await restaurantModel(
                {
                    title, 
                    imageUrl,
                    foods,
                    time,
                    pickup,
                    delivery,
                    isopen,
                    logoUrl,
                    ratingCount,
                    code,
                    coords
                 });

             await newRestuarnt.save();
              
              res.status(200).send({success:true, message:'Restaurant is created successfully'})

   } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:'Error in CREATE restaurant API',
        error
      })
   }
}

// GET ALL RESTAURANTS
const getAllRestaurantControoler = async (req,res)=>{
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants) return res.status(404).send({success:false, message:'Not able to find restuant'});

        res.status(200).send({
            success:true,
            message:"Restaurant Find sucesfully",
            restaurantCount: restaurants.length,
            restaurants,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in GET restaurant API',
            error,
        })
    }

}

// GET SINGLE RESTAURANT
const getSingleRestaurantController = async(req,res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId) 
            return res.status(404).send({success:false, message:"Restaurat ID not found"});
    
        const restaurant = await restaurantModel.findById(restaurantId);
        if(!restaurant) 
            return res.status(404).send({success:false, message:"Restaurat not found"});

        res.status(200).send({
            success:true,
            message:"Restaurant find sucessfully",
            restaurant,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while geting restaurant',
            error,
        })
    }
};

// DELETE A RESTAURANT
const deleteRestaurantController = async(req,res)=>{
    try {
        const restaurantID = req.params.id;

        if(!restaurantID)
            return res.status(404).send({success:false, message:'Restaurant ID not found'});

        await restaurantModel.findByIdAndDelete(restaurantID);

        res.status(200).send({
            success:true,
            message:'Restaurant Deleted Sucessfully',
            restaurantID,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Delete API is not working',
            error,
        })
    }
}

module.exports = {createRestaurantController, getAllRestaurantControoler, getSingleRestaurantController, deleteRestaurantController};