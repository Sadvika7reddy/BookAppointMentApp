const uuid=require('uuid');
const sendMail=require('@sendgrid/mail');
const bycrpt=require('bcrypt');
const User=require('../models/users')
const ForgotPassword=require('../models/forgotpassword')
const forgotpassword=async(req,res)=>{
    try{
      const {email}=req.body;
      const user=await User.findOne({where:{email}})
      if(user){
        const id=uuid.v4();
        user.createForgotpassword({ id , active: true })
        .catch(err=>{
            throw new Error(err)
        })
        sendMail.setApiKey(process.env.SENGRID_API_KEY)
        const msg={
            to:email,
            from:'sadvika4amanganti@gmail.com',
            subject:'Welcome to Company',
            text:'Nice to meet to uu',
            html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
        }
        await sendMail.send(msg)
        return res.status(response[0].statusCode).json({message:'reset password Link is send to ur mail',sucess:true})
        
      }
      else{
        throw new Error('User doesnt exit')
      }
    }
    catch(err){
        return res.json({message:err,sucess:false})
    }
}
const resetpassword=async(req,res)=>{
    try{
        const id=req.params.id;
    let forgotpasswordRequest=await ForgotPassword.findOne({where:{id}})
    if(forgotpasswordRequest){
        forgotpasswordRequest.update({active:false})
        res.status(200).send(
            `<html>
            <script>
            function formsubmitted(e){
                e.preventDefault();
            }
            </script>
            <form action='/password/updatepassword/${id}' method='get>
              <label for='newpassword'>Enter New Password</label>
              <input type='password' name='newpassword' required/>
              <button>reset password</button>
            </form>
            </html>`
        )
        res.end()
    }
    }
    catch(err){
        return res.json({message:err,sucess:false})
    }
   
}
const updatepassword=async(req,res)=>{
    try{
        const {newpassword}=req.query;
        const {resetpassword}=req.params.id
        let resetpasswordRequest=await ForgotPassword.findOne({where:{id:resetpassword}})
        let user=await User.findOne({where:{id:resetpasswordRequest}})
        if(user){
            const saltRounds=21;
            bycrpt.genSalt(saltRounds,async function(err,salt){
                if(err){
                    throw new Error(err)
                }
                bycrpt.hash(newpassword,salt,async function(err,hash){
                    if(err){
                        throw new Error(err)
                    }
                    await user.update({password:hash})
                    return res.status(201).json({message:'new password updated sucessfuly'})
                })
            })
        }
        else{
            return res.status(401).json({message:"user doent exit",sucess:false})
        }
    }
    catch(err){
       return res.status(401).json({message:err,sucess:false})  
    }
}

module.exports={
  forgotpassword,
  resetpassword,
  updatepassword
}