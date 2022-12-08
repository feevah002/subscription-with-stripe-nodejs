const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    trim:true
  },
  billingID: {
    type:String,
    required:true,
  },
  password:{
    type:String
  },
  plan:{
    type:String, enum:["pro","basic","none"], default:"none",
    trim:true
  },
  hasTrial:{
    type:Boolean, default:null
  },
  endDate:{
    type:Date, default:null
  },
})



userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);