const router = require("express").Router()
const {
  isLoggedIn
  
}= require("../middleware/index")


router.get("/none", isLoggedIn, (req,res)=>{
  res.render("none")
})
module.exports = router