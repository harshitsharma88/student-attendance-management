const db = require('../util/databse');

exports.getDate=async (date)=>{
    const response=await db.query(`select * from users join dailyattendance on users.id=dailyattendance.id where day ="${date}"`);
    return response;
   
}

exports.getStudent=async()=>{
    return await db.query(`select * from users`);
}

exports.storeRecord=async(data,date)=>{
    let statement='insert into dailyattendance values'
    const number = await this.getStudent();
    // const keys=Object.keys(data);
    
    
    data.forEach((ele,ind)=>{
        statement+=`("${date}",${ele.split('_')[0]},${ele.split('_')[1]==='true'?1:0})${ind===data.length-1?";":","}`;
    })
    console.log(statement);
    try{
        await db.query(statement);
    }
    catch(err){
        console.log(err);
        return "Error in Db";

    }
    return "Success";
}

exports.getReport=async()=>{
    const response= [];
    let arr= await db.query('select * from users');
    arr=arr[0]
    
    const dates= await db.query('select distinct day from dailyattendance');
    
    const days=dates[0].length;
    for(let i=0;i<arr.length;i++){
        const present=await db.query(`select day from dailyattendance where id =${arr[i].id} and present=1;`);
        const attended=`${present[0].length}/${days}`;
        const percentage=`${present[0].length/days*100}%`;
        const obj={
            id:arr[i].id,
            name:arr[i].name,
            days:attended,
            percent:parseInt(percentage)
        }
        
        response.push(obj);
        
    }
    return response;


}