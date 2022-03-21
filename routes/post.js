const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/new3")
/* GET users listing. */
const postSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  user_id:Number,
  status:String,
  date:{
    type:Date,
    default:Date.now()
  }
})

module.exports = mongoose.model("post",postSchema);
