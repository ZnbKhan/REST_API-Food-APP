const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// routes
// GET USER || GET
router.get('/getUser', authMiddleware ,getUserController)

// UPADTE PROFILE
router.put('/updateUser', authMiddleware, updateUserController )

// UPADTE PASSWORD
router.put('/updatePassword', authMiddleware, updatePasswordController)

//RESET PASWORD 
router.post('/resetPassword', authMiddleware, resetPasswordController)

// DELETE USER
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController )
module.exports = router;