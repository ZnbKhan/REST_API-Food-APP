// Category Controller
const categoryModel = require('../models/categoryModel')

// CREATE CATEGORY CONTROLLER
const createCategoryController = async(req,res)=>{
    try {

        const {title, imageUrl} = req.body;

        if(!title)
            return res.status(500).send({success:false, message:'Title should not be empty'});

        const newCategory = await categoryModel.create({title, imageUrl});

        await newCategory.save();

        res.status(200).send(
            {
                success:true,
                message:'Category is saved sucessfully',
                newCategory,
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Create Category API',
            error,
        })
    }
};

// GET CATEOGRY CONTROLLER
const getAllCategoryController = async (req,res)=>{
   try {
        const cateogry = await categoryModel.find();

        if(cateogry.length === 0) 
          {  return res.status(404).send({
              success:false,
              message:'No Category found',
            })
        }
        res.status(200).send({
            success:true,
            message:'Data Fetched Sucessfully',
            totalCount:cateogry.length,
            cateogry,
        })
    
   } catch (error) {
     console.log(error);
     res.status(500).send({
        success:false,
        message:'Error in GET API',
        error,
     })
   }
}

// UPDATE CATEGORY
const updateCategoryControllers = async(req,res)=>{
    try {
        const categoryId = req.params.id;

        if(!categoryId) {
            return res.status(404).send({
                success:false,
                message:'CategoryID is not found'
            })
        }

        const {title, imageUrl} = req.body;

        const updatedCategory = await categoryModel.findByIdAndUpdate(
             categoryId, //serach krega
            {title, imageUrl}, //kya kya update krna
            {return:true} //this return updated category
        )
        
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'Error in updating category'
            })
        }

        res.status(200).send({
            success:true,
            message:'Cateogry is updated sucessfully',
            updatedCategory,
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Update Category API'
        })
    }
};

// DELETE CATEGORY
const deleteCategoryControllers = async(req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(500).send({
                success:false,
                message:'Category ID is required',
            });
        }

        const category = await categoryModel.findById(id);

        if(!category){
            return res.status(500).send({
                success:false,
                message:'No Category Found'
            })
        }

        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            message:'Deleted Category Sucessfully',
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in delete category API',
            error,
        })
    }
}

module.exports = {createCategoryController, getAllCategoryController, updateCategoryControllers, deleteCategoryControllers};