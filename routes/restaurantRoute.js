const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantControoler, getSingleRestaurantController, deleteRestaurantController } = require('../controllers/restaurantController');
const router = express.Router();


// routes
// CREATE restaunt || POST
router.post('/create', authMiddleware, createRestaurantController)

// GET ALL restaurant || GET
router.get('/getAll', getAllRestaurantControoler)

// GET single restaurant
router.get('/getRestaurant/:id', getSingleRestaurantController);

// DELETE a restaurant
router.delete('/delete/:id', deleteRestaurantController)

module.exports = router;