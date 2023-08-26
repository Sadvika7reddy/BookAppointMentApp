const Expense=require('../models/expense')
const User=require('../models/users')
const getpremiumExpenses=async(req,res,next)=>{
     const expenses=await Expense.findAll()
     const users=await User.findAll()
      let amountWithId={}
     expenses.forEach(expense => {
        if(amountWithId[expense.userId]){
            amountWithId[expense.userId]+=expense.amount 
        }
        else{
            amountWithId[expense.userId]=expense.amount
        }
        
     });
     const nameWithAmount=[];
     users.forEach((user)=>{
         nameWithAmount.push({name:user.name,totalAmount:amountWithId[user.id]})
     })

    let result=nameWithAmount.sort((a,b)=>{
        console.log(a.totalAmount)
        return b.totalAmount-a.totalAmount
    })
     
     return res.status(201).json({result})
}

module.exports={
    getpremiumExpenses
}