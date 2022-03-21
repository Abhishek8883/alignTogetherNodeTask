var express = require('express');
var router = express.Router();
var userModel = require('./users')
var postModel = require('./post')
const passport = require('passport')
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index")
});


router.get('/profile', function(req, res, next) {
  res.render("profile")
});

router.post('/register',function(req,res){
  var newuser = new userModel({
    email:req.body.email,
    username:req.body.username
  })
  userModel.register(newuser,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,
      function(){
        res.redirect('/profile')
      })
  })
  .catch(function(err){
    res.send(err)
  })
})


router.post('/createpost',isLoggedIn,function(req,res,next){
  userModel.findOne({username:req.session.passport.user})
  .then(function(founduser){
    let status = req.body.status
  postModel.create({
    user:founduser._id,
    user_id:req.body.user_id,
    status:status
  })
  .then(function(data){
    founduser.posts.push(data)
    founduser.save()
    .then(function(){
      res.redirect('/profile')
    })
  })
})
})

router.get('/getdata/:user_id/:limit',function(req,res,next){
  postModel.find({user_id:req.params.user_id}).limit(Number(limit))
  .then(function(foundPosts){
    res.send(foundPosts)
  })
})



router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res,next){});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/")
}
 

router.get('/logout' , function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;
