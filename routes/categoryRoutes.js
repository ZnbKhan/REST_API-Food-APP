const express = require('express');
const { createCategoryController, getAllCategoryController, updateCategoryControllers, deleteCategoryControllers } = require('../controllers/cateogryControllers');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

// ROUTES 
// CREATE CATEGORY
router.post('/create', authMiddleware ,createCategoryController);

// GET
router.get('/getAll', authMiddleware, getAllCategoryController);

// UPDATE 
router.put('/update/:id', authMiddleware, updateCategoryControllers);

//DELETE
router.delete('/delete/:id', authMiddleware, deleteCategoryControllers);


module.exports = router;