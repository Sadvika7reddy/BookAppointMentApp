const Sequelize=require('sequelize')
const sequelize=require('../util/database')

let Expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
    amount:Sequelize.INTEGER,
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }   
})

module.exports=Expense;