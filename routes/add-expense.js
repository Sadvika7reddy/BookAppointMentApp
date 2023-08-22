const express=require('express')
const router = express.Router();

const expenseControllers=require('../controllers/add-expense')

router.post('/expense/add-expenses',expenseControllers.addExpense)

router.get('/expense/get-expenses',expenseControllers.getExpense)

router.delete('/expense/delete-expenses/:productId',expenseControllers.deleteExpense)

module.exports=router;