const jwt=require('jsonwebtoken');
const User=require('../models/users');

const authenticate=async (req,res,next)=>{
    try{
       const token=req.header('Authorization');
       const users=jwt.verify(token,'adsjh98998wiikjnxnkjkbsbihhdd8wwhssjns')
       console.log('userIddd',users.userId)
       let user=await User.findByPk(users.userId)
       req.user=user;
       next();
    }
    catch(err){
        return res.status(401).json({sucess:false})
    }
}
module.exports={
    authenticate
}