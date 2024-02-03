const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const multer=require('multer')
const fs=require('fs')

app.use(express.json())
app.use(cookieParser())
require('dotenv').config()
app.use('/uploads',express.static(__dirname+'/'))

const authController=require('./controllers/authController')

mongoose.connect(process.env.MongoDB_URL).then(() => {
    console.log("MongoDB Connected")
}).catch((error) => {
    console.log(error)
})

const photosMiddleware=multer({dest:'uploads/'})

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadFiles);
})

app.get('/',(req,res)=>{
    res.json("Hello World")
})

app.post('/register', authController.handleUserRegistration)
app.post('/login',authController.handleUserLogin)
app.post('/changePassword',authController.handleUpdatePassword)
app.get('/accoundInfo',authController.handleAccountInfo)
app.post('/updateUser/:id',authController.handleUpdateUser)

app.listen(4000,()=>{
    console.log("Connected to the server at 4000")
})  
