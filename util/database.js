const Sequelize=require('sequelize')

const sequelize=new Sequelize('expence','root','PHW#84#jeoa',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize