const mongoose=require("mongoose");

const plm=require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/new3")

const userSchema=mongoose.Schema({
  username:String,
  email:String,
  posts:{
    type:Array,
    default:[]
  },
  createdDate:{
    type:Date,
    default:Date.now()
  },
  password:String,
})

userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema);
