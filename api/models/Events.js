const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    owner : {type: mongoose.Schema.Types.ObjectId , ref :'User'} , 
    title:String,
    address : String , 
    photos : [String] , 
    description : String , 
    features : [String] , 
    extraInfo : String , 
    startDate : Number ,
    endDate : Number ,
    year : Number ,
    maxMembers : Number ,
    price : Number ,
})

const PlaceModel = mongoose.model('Event' , EventSchema);

module.exports = PlaceModel;