const Expense=require('../models/expense')
const User=require('../models/users');
const sequelize = require('../util/database');
const AWS=require('aws-sdk') 
const DownloadFiles=require('../models/downloadfile')

exports.downloadExpense = async (req,res)=> {
    try{
      const expenses = await Expense.findAll({where : {userId : req.user.id}})
      console.log('Expense Array>>>>>>>>>>>>>>>>>>>',expenses)
       console.log("hii")
      const stringifiedExpenses = JSON.stringify(expenses)
   
      const userId = req.user.id
      const filename = `Expenses${userId}/${new Date}.txt`
      const fileURL = await uploadToS3(stringifiedExpenses, filename)
   
      console.log('FileURL>>>>>', fileURL)
      const createdLink = await DownloadFiles.create({link: fileURL,userId: userId})
   
      const allLinks = await DownloadFiles.findAll()
   
      return res.status(201).json({fileURL,allLinks:allLinks, success: true})
    }
    catch(err){
       console.log(err)
       res.status(500).json({fileURL: '', success: false})
    }
       
   
      
   
   }
   
   async function uploadToS3(data, filename)
   {
       try{
           const BUCKET_NAME = 'bookapp098'
           const IAM_USER_KEY = 'AKIA32YIKWK5EV6BORWB'
           const IAM_USER_SECRET = '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'
   
           let s3Bucket = new AWS.S3({
               accessKeyId: IAM_USER_KEY,
               secretAccessKey: IAM_USER_SECRET,
               //Bucket: BUCKET_NAME
           })
   
           
           var params = {
                   Bucket: BUCKET_NAME,
                   Key: filename,
                   Body: data,
                   ACL: 'public-read'
           }
           return new Promise((resolve,reject)=> {
               s3Bucket.upload(params, (err, s3response)=> {
                   if(err){
                       reject(err)
                   }
                   else{
                       console.log('Success', s3response)
                       resolve(s3response.Location) 
                   }
               })
           })
               
       }
       catch(err){
           throw new Error(err)
       }
       
       
   
   
   
   }
   

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