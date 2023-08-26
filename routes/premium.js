const express=require('express');

const router = express.Router();

const premiumController=require('../controllers/premium')

router.get('/premium/getLeaderBoard',premiumController.getpremiumExpenses)

module.exports=router;