const Expense=require('../models/expense')
const User=require('../models/users')
const sequelize = require('../util/database')
const getpremiumExpenses=async(req,res,next)=>{
     const result=await User.findAll({
        attributes:['id','name','totalAmount'],
        
     //     include:[
     //          {
     //            model:Expense,
     //            attributes:[]
     //          }
     //     ],
     //     group:['users.id'],
         order:[['totalAmount','DESC']]

     })
     
     return res.status(201).json({result})
}

module.exports={
    getpremiumExpenses
}