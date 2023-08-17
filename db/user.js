const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username : {
        type :String,
        required: true
    }, 
    password : {
        type : String,
        required: true
    },
    comfirmpass : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
    }
})
// convert this user schema to model 
module.exports = mongoose.model("Users",user);