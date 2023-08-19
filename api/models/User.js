const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : String,
    email : {type : String , unique : true , require:true},
    password : {type:String , require : true} ,
})


const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel;