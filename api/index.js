const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader')

const mongoose = require('mongoose')
const User = require('./models/User.js')

require('dotenv').config()

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const secrettoken = 'eogibrugnr5gbeufhijnbuhj';

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        credentials:true,
        origin:'http://localhost:5173'
    }
))

 mongoose.connect(process.env.MONGO_URL)

app.get('/test' , (req,res) => {
    res.json('Test ok')
})

app.post('/register' ,async (req,res) => {
    const {name,email,password} = req.body
    try{
        const userDoc = await User.create({
            name ,
            email ,
            password : bcrypt.hashSync(password,bcryptSalt),
        })
        res.json(userDoc)
    }
    catch(e){
        res.status(422).json(e)
    }
})

app.post('/login' , async (req,res) => {
    const {email,password} = req.body
    const userDoc = await User.findOne({email})
    if (userDoc) {
            const passOk = bcrypt.compareSync(password , userDoc.password)
            if(passOk) {
                jwt.sign({email:userDoc.email,id:userDoc._id},secrettoken , {} , (err,token) => {
                    if (err) throw err;
                    res.cookie('token',token).json(userDoc)
                })

            }
            else {
                res.status(422).json('Pass Wrong')
            }
        }
    else {
            res.json('Not Found')
        }
    }
)

app.get('/profile' , (req,res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token,secrettoken,{}, async (err , user) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(user.id)
            res.json({name,email,_id})
        })
    }
    else{
        res.json({token})
    }
})


app.post('/logout' , (req,res) => {
    res.cookie('token' , '').json(true)
})
    

app.post('/upload-by-link' ,async (req,res) => {
    const {link} = req.body;
    const newName ='photo' +  Date.now() + '.jpg';
    await download.image({
        url: link , 
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName)
})



app.listen(4000)