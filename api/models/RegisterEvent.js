const mongoose = require('mongoose')

const RegisterEventSchema = new mongoose.Schema({
    event : {type: mongoose.Schema.Types.ObjectId , required: true , ref: 'Event'} ,
    user : {type:mongoose.Schema.Types.ObjectId , required: true} ,
    date : {type:Number , required: true} , 
    month : {type:Number , required:true} , 
    year : {type:Number , required : true} ,
    name : {type:String , required : true} ,
    phone : {type:Number , required:true} ,
    price : Number
})


const RegisterEventModel = mongoose.model('RegisterEvent' , RegisterEventSchema)

module.exports = RegisterEventModel