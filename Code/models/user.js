const {DataTypes}=require('sequelize');
const sequelize=require('../util/databse');

const User= sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING
    }

});

module.exports=User;