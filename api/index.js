const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader')
const multer = require('multer')
const fs = require('fs')

const mongoose = require('mongoose')

const User = require('./models/User.js')
const Event = require('./models/Events.js')
const RegisterEvent = require('./models/RegisterEvent.js')

require('dotenv').config()

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const secrettoken = 'eogibrugnr5gbeufhijnbuhj';

app.use(express.json())
app.use(cookieParser())
app.use('/uploads' , express.static(__dirname + '/uploads'))
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
    
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await download.image({
      url: encodeURIComponent(link),
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  });

const PhotosMiddleware = multer({dest:'uploads'})

app.post('/upload', PhotosMiddleware.array('photos',100) , (req ,res) => {
    const uploadedFiles = [];
    for (let i =0;i<req.files.length;i++) {
        const {path , originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
res.json(uploadedFiles)
})


app.post('/myevents', (req,res) => {
    const {token} = req.cookies;
    const {
      title,address,addedPhotos,description,
      features,extraInfo,startDate,endDate,year ,maxMembers , price
    } = req.body;
    jwt.verify(token, secrettoken, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Event.create({
        owner:userData.id,
        title,address,photos:addedPhotos,description,
        features,extraInfo,startDate , endDate, year ,maxMembers,price
      });
      res.json(placeDoc);
    });
  });


  


  app.get('/myevents' , (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secrettoken, {}, async (err, userData) => {
        if (err) throw err
        const {id} = userData;
        res.json(await Event.find({owner:id}))
    })
  })


  app.get('/myevents/:id' ,async (req,res) => {
    const {id} = req.params
    res.json(await Event.findById(id))
})

app.get('/event/:id' ,async (req,res) => {
    const {id} = req.params
    res.json(await Event.findById(id))
})


app.put('/myevents' , (req,res) => {
    const {token} = req.cookies;
    const {
     id, title,address,addedPhotos,description,
      features,extraInfo,startDate,endDate,year , maxMembers,price
    } = req.body;
    jwt.verify(token, secrettoken, {}, async (err, userData) => {
        const EventDoc = await Event.findById(id);
        if (userData.id === EventDoc.owner.toString() ){
            EventDoc.set({title,address,photos:addedPhotos,description,
                features,extraInfo,startDate , endDate, year , maxMembers , price})
               await EventDoc.save()
                res.json('ok')
        }
    })
})


app.get('/allevents' , async (req,res) => {
    res.json(await Event.find())
})


app.post('/registerevent' ,async (req,res) => {
    const userData = await getUserDataFromToken(req);
    const {event , date , month , year , name , phone , price } = req.body
    RegisterEvent.create({
        event , date , month , year , name , phone , price , 
        user : userData.id
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err
    })
})


function getUserDataFromToken(req) {
    return new Promise((resolve,reject) => {
        jwt.verify(req.cookies.token, secrettoken, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData)
        })
    })
}


app.get('/registerevent' , async (req,res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await RegisterEvent.find({user:userData.id}).populate('event'))
})



app.listen(4000)