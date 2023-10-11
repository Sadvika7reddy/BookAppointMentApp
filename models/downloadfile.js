const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const downloadfile=sequelize.define('download',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
    link:Sequelize.STRING,
    userId:Sequelize.INTEGER
}) 

module.exports=downloadfile