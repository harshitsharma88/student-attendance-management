const db = require('mysql2');
const que= db.createPool({
    user:'root',
    password:'Harshit7174@',
    database:'booking',
}).promise();
async function name(params) {
  
    try{const res=await que.query('insert into pee values(1221)');}
    catch(err){
        console.log(err);
        return err;
    }
   return true;
}
name().then(res=>{
    console.log(res);
})


