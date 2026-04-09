const mongoose = require("mongoose")
const horoscopeSchema = new mongoose.Schema({
    sign:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["daily","weekly","yearly"],
        required:true
    },
    prediction:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports = mongoose.model("Horoscope",horoscopeSchema)