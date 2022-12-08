const router = require("express").Router()

const {
  isLoggedIn,
  hasPlan
}= require("../middleware/index")

router.get("/basic", [isLoggedIn, hasPlan("basic")], (req,res)=>{
  res.render("basic")
})
module.exports = router