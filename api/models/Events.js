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
    maxMembers : Number
})

const PlaceModel = mongoose.model('Place' , EventSchema);

module.exports = PlaceModel;