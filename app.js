const bodyParser=require('body-parser');

const express=require('express');

const sequelize=require('./util/database');

const cors=require('cors')

const applyRoutes=require('./routes/add-users')
const expenseRoutes=require('./routes/add-expense');

const app=express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(applyRoutes);
app.use(expenseRoutes)
sequelize.sync()
.then((result)=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})