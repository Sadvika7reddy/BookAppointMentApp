const express=require('express')
const Authentication=require('../middleware/auth')
const router = express.Router();

const expenseControllers=require('../controllers/add-expense')

router.post('/expense/add-expenses',Authentication.authenticate,expenseControllers.addExpense)

router.get('/expense/get-expenses',Authentication.authenticate,expenseControllers.getExpense)

router.delete('/expense/delete-expenses/:productId/:amount',Authentication.authenticate,expenseControllers.deleteExpense)

module.exports=router;