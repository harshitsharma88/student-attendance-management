const query=require('../dbQuery/queries')
exports.homeGet = (req,res,next)=>{
    res.render('home');
}

exports.homePost = (req,res,next)=>{
    console.log(req.body.ch==null);
    res.json(req.body)
}

exports.getDate = (req,res,next)=>{
    query.getDate(req.params.date).then(result=>{
        res.json(result);
    });
}

exports.getStudent=(req,res,next)=>{
    query.getStudent()
    .then(result=>{
        res.json(result);
    })
}

exports.postAttendance=(req,res,next)=>{

    console.log(Array.isArray(req.body.data));

    
    query.storeRecord(req.body.data,req.body.date)
    .then(result=>{
        if(result=='Success'){
      
            res.json('Success')
        }
        else{
            res.json("Error")
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getReport=(req,res,next)=>{
    query.getReport()
    .then(result=>{
        res.json(result)

    })
    .catch(err=>console.log(err));
}