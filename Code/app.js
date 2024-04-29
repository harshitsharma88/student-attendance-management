const PORT=4000;
const express=require('express');
const app=express();
const path=require('path')
const homeRouter= require('./routes/home');
const bodyParser=require('body-parser');
const cors=require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use('/',homeRouter);


app.listen(PORT,()=>{
    console.log("Listening On Port "+PORT);
});
