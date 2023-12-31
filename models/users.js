const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Users=sequelize.define('users',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  name:Sequelize.STRING,
  email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  ispremiumuser:Sequelize.BOOLEAN,
  totalAmount:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
})
 
module.exports = Users;