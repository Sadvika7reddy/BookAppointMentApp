const Expense=require('../models/expense')

exports.addExpense=async(req,res,next)=>{
    try{
        const amount=req.body.amount;
        const category=req.body.category;
        const description=req.body.description;
        const data=await Expense.create({amount:amount,category:category,description:description})
        res.status(201).json({expenseDetails:data})
    }
    catch(err){
        res.status(400).json({err:err})
    }
    
}

exports.getExpense=async (req,res,next)=>{
    try{
        const data=await Expense.findAll();
        res.status(200).json({allExpense:data})
    }
    catch(err){
       res.status(500).json({err:err}) 
    }
}

exports.deleteExpense=async(req,res,next)=>{
    const expenseId=req.params.productId;
    await Expense.destroy({where:{id:expenseId}})
    res.sendStatus(200)
}