 const mysql=require('mysql2');
 const db= mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Harshit7174@',
    database:'attendance'
 });

 module.exports=db.promise();