require('dotenv').config()
require('./src/connect/mongodb')
const express = require("express"),
      expressSession = require("express-session")
      mongoose = require("mongoose"),
      app = express(),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      localStrategy = require("passport-local"),
      User = require('./app/user/model');

// extras
app.use('/webhook', bodyParser.raw({ type: 'application/json' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")


// auth handling
app.use(expressSession({
  secret:"feevah the greatest",
  resave:false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passing req.user to all views pages with the variable vurrentUser 
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

//route handlers
const userRoute = require(`./app/user/route`)
const payRoute = require(`./app/payment/route`)
const proRoute = require(`./app/pro/route`)
const basicRoute = require(`./app/basic/route`)
const noneRoute = require(`./app/none/route`)
app.use(userRoute)
app.use(payRoute)
app.use(proRoute)
app.use(basicRoute)
app.use(noneRoute)


// server connection
const port = 7000
app.listen(port, (err)=>{
  if(err){console.log(err)}
  console.log(`server started successfully at port ${port}`)
})