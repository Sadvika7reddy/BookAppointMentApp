const Expense=require('../models/expense')
const User=require('../models/users');
const sequelize = require('../util/database');

exports.addExpense=async(req,res,next)=>{
    try{
        const trans=await sequelize.transaction();
        const amount=req.body.amount;
        const category=req.body.category;
        const description=req.body.description;
        const userId=req.user.id
        const data=await Expense.create({amount:amount,category:category,description:description,userId:userId},{transaction:trans})
        const totalAmount=Number(req.user.totalAmount)+Number(amount)
        console.log(totalAmount)
        await User.update({
            totalAmount:totalAmount,
        },{
            where:{id:req.user.id},
            transaction:trans

        })
         await trans.commit();
         return res.status(201).json({expenseDetails:data})
    }
    catch(err){
        await trans.rollback();
       return res.status(400).json({err:err})
    }
    
}

exports.getExpense=async (req,res,next)=>{
    try{
        const data=await Expense.findAll({where:{userId:req.user.id}});
        res.status(200).json({allExpense:data})
    }
    catch(err){
       res.status(500).json({err:err}) 
    }
}

exports.deleteExpense=async(req,res,next)=>{
    try{
        const trans=await sequelize.transaction();
        const expenseId=req.params.productId;
        const userid=req.user.id
        const amount=req.params.amount;
        await Expense.destroy({where:{id:expenseId,userId:userid}},{transaction:trans})
        const totalAmount=Number(req.user.totalAmount)-Number(amount)
        await User.update({
            totalAmount:totalAmount
        },{
            where:{id:req.user.id},
            transaction:trans
        })
        await trans.commit();
        return res.sendStatus(200)
    }
    catch(err){
        await trans.rollback();
        return res.status(500).json({err:err})
    }
}