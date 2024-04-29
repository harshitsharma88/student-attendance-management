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
    
    
    data.forEach((ele,ind)=>{
        statement+=`("${date}",${ele.split('_')[0]},${ele.split('_')[1]==='true'?1:0})${ind===data.length-1?";":","}`;
    })
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

    const dates= await db.query('select distinct day from dailyattendance');
    
    const days=dates[0].length;
    
   let records=await db.query(`select users.id,name,sum(present) as present from users join dailyattendance on users.id=dailyattendance.id group by users.id order by users.id`);
    records=records[0];
   
    records.forEach(element=>{
        element.days=`${element.present}/${days}`;
        element.percent=parseInt(element.present/days*100);
    })
    
    return records;
}