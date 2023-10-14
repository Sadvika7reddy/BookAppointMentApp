const Razorpay=require('razorpay')
const Order=require('../models/orders')

const purchasepremium=async(req,res,next)=>{
   try{
        var rzp=new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
              
            key_secret:process.env.RAZORPAY_KEY_SECRET
           
        })
        const amount=2400;
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
             req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
             })
            
        })
   }
   catch(err){
       return res.status(403).json({message:"something went wrong",error:err})
   }
}

const updatetransactionstatus=async(req,res,next)=>{
    try{
       const {payment_id,order_id}=req.body;
       let order=await Order.findOne({where:{orderid:order_id}}) 
       if(order){

        let promise1=order.update({paymentid:payment_id,status:'SUCCESSFUL'})
        let promise2=req.user.update({ispremiumuser:true})
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({sucess:true,message:'Transaction succesfulll'})
        })
         
       }
       else{
        await order.update({paymentid:payment_id,status:'FAILED'})
        return res.status(400).json({sucess:false,message:'Transaction Failed'})
       }
           } 
    catch(err){
       return res.status(403).json({sucess:false,message:'Transaction Failed'})
    }
}

module.exports={
    purchasepremium,
    updatetransactionstatus
}