const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'User name is required']
    },
    email:{
        type:String,
        required:true,
        unique:[true, 'Email is required']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'Phone number is required']
    },
    userType:{
        type:String,
        // required:[true, 'User type is required'],
        enum:['client', 'admin', 'vendor', 'driver']
    },
    profile:{
        type:String,
        default:`https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png`
    },
    answer:{
        type:String,
        required:[true, "Answer is required"]
    },

}, {timestamps:true})

// export
module.exports = mongoose.model('User', userSchema) //created user table in mongodb
