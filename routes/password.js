const express=require('express');

const router = express.Router();

const addControllers=require('../controllers/forgot-password');

router.get('/password/updatepassword/:id',addControllers.updatepassword)
router.get('/password/resetpassword/:id',addControllers.resetpassword)

router.use('/password/forgotpassword', addControllers.forgotpassword)

 




module.exports = router;