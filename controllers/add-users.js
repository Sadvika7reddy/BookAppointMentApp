const Users=require('../models/users')
exports.postAddDetails=async (req,res,next)=>{
    try{
        if(!req.body.name){
            throw new Error('email is mandotory')
        }
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const data=await Users.create({name:name,email:email,password:password})
        res.status(201).json({newUserDetails:data})
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
        if(user[0].password==password){
            res.status(201).json({sucess:true,message:'user successfully loggIn'})
        }
        else{
            throw new Error({success:false,message:'password incorrect'})
        }
       }
       else{
        throw new Error({success:false,message:'userId doesnt exit'})
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