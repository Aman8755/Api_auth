const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoute = require('./route/user.js');
const usersRoute = require('./route/users.js');//1


const userSchema = require('./route/user');
const fileUpload = require('express-fileupload');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));  ///for- bodyparser 
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles:true
}));


mongoose.connect('mongodb+srv://amanbrovitech:aman2001@brovitech.hbpmp9p.mongodb.net/Brovitech?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
})

mongoose.connection.on('connected',connected=>{
    console.log('connected server...');
})


app.use('/user', userRoute);
app.use('/users',usersRoute); //2

app.use((req,res,next)=>{
    res.status(404).json({
        Error:'url not found'
    })
})

module.exports = app;