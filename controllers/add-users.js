const Users=require('../models/users')
const bcrypt=require('bcrypt')
exports.postAddDetails=async (req,res,next)=>{
    try{
        if(!req.body.name){
            throw new Error('email is mandotory')
        }
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const salt=10;
        bcrypt.hash(password,salt,async (err,hash)=>{
            const data=await Users.create({name:name,email:email,password:hash})
            res.status(201).json({newUserDetails:data})
        })
        
    }
    catch(err){
       res.status(500).json({
        error:err
       })
    }
}

exports.getAddDetails=async (req,res,next)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
       let user=await Users.findAll({where:{email}})
       if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                throw new Error('somthing went wrong')
            }
             if(result){
                res.status(201).json({sucess:true,message:'user successfully loggIn'})
             }
             else{
                return res.status(400).json({success:false,message:'password incorrect'})
            }
        })
        
       }
       else{
          return res.status(401).json({success:false,message:'userId doesnt exit'})
       }
    }
    catch(error){
        res.status(500).json({
         error:error
        })
     }
    // const users=await Users.findAll();
    // res.status(200).json({allUsers:users})
}

// exports.deleteAddDetails=async (req,res,next)=>{
//     const userId=req.params.productId;
//     await Users.destroy({where:{id:userId}})
//     res.sendStatus(200)
// }