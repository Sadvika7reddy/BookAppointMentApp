const Expense=require('../models/expense')
const User=require('../models/users')
const sequelize = require('../util/database')
const getpremiumExpenses=async(req,res,next)=>{
     const result=await User.findAll({
        attributes:['id','name',[sequelize.fn('sum', sequelize.col('expenses.amount')), 'totalAmount']],
         include:[
              {
                model:Expense,
                attributes:[]
              }
         ],
         group:['users.id'],
         order:[['totalAmount','DESC']]

     })
    //  const amountWithId = await Expense.findAll({
    //     attributes: [
    //       'userId', 
    //      [sequelize.fn('sum', sequelize.col('expense.amount')), 'totalAmount'],
    //     ],
    //     group: ['userId'],
    //     raw: true
    //   });
    //   let amountWithId={}
    //  expenses.forEach(expense => {
    //     if(amountWithId[expense.userId]){
    //         amountWithId[expense.userId]+=expense.amount 
    //     }
    //     else{
    //         amountWithId[expense.userId]=expense.amount
    //     }
        
    //  });
    //  const nameWithAmount=[];
    //  users.forEach((user)=>{
    //      nameWithAmount.push({name:user.name,totalAmount:amountWithId[user.id]})
    //  })

    // let result=nameWithAmount.sort((a,b)=>{
    //     return b.totalAmount-a.totalAmount
    // })
     
     return res.status(201).json({result})
}

module.exports={
    getpremiumExpenses
}