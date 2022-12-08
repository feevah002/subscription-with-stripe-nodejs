const passport = require("passport")
const {
  newUser,
} = require('./repository')
const {
  addNewCustomer
}= require(`../payment/repository`)

exports.register = async(req,res)=>{
  try{
    const username = req.body.username
    const billingID = await addNewCustomer(username)
    const payload = {
      username:username,
      billingID: billingID.id
    }
    const password = req.body.password
    await newUser(payload, password)
    passport.authenticate("local")(req,res, function(){
      res.redirect("/")
   })
  } catch(err){
    res.status(500).json({
      status: false,
      error:err
    })
  }
}

exports.login = passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
})