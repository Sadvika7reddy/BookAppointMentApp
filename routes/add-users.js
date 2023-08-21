const express=require('express');

const router = express.Router();

const addControllers=require('../controllers/add-users');



router.post('/user/add-users', addControllers.postAddDetails)

// router.get('/user/get-users',addControllers.getAddDetails)

// router.delete('/user/delete-users/:productId',addControllers.deleteAddDetails)


module.exports = router;