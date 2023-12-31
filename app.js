const bodyParser=require('body-parser');
const fs=require('fs')
const path=require('path')
const express=require('express');
const User=require('./models/users')
const Expense=require('./models/expense')
const Order=require('./models/orders')
const sequelize=require('./util/database');
const ForgotPassword=require('./models/forgotpassword')
const cors=require('cors')
const morgan=require('morgan')

const applyRoutes=require('./routes/add-users')
const expenseRoutes=require('./routes/add-expense');
const purchaseRoutes=require('./routes/purchase')
const premiumRoutes=require('./routes/premium')
const passwordRoutes=require('./routes/password');
const { SsoTokenRequest } = require('sib-api-v3-sdk');
const helmet=require('helmet')
const app=express();
const dotenv=require('dotenv')
const acessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

dotenv.config();



app.use(helmet())
app.use(morgan('combined',{stream:acessLogStream}))
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(applyRoutes);
app.use(expenseRoutes)
app.use(purchaseRoutes)
app.use(premiumRoutes)
app.use(passwordRoutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User)

sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})