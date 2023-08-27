const Expense=require('../models/expense')
const User=require('../models/users')
const sequelize = require('../util/database')
const getpremiumExpenses=async(req,res,next)=>{
     try{
          const result=await User.findAll({
               attributes:['id','name','totalAmount'],
                order:[['totalAmount','DESC']]
       
            })
            
            return res.status(201).json({result})
     }
     catch(err){
          res.status(400).json({err:err})
     }
    
}

module.exports={
    getpremiumExpenses
}