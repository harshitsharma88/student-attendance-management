const Sequelize=require('sequelize');
const sequelize= new Sequelize('attend','root','Harshit7174@',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;