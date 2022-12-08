const router = require("express").Router()
const {
  isLoggedIn,
  hasPlan
}= require("../middleware/index")

router.get("/pro", [isLoggedIn, hasPlan("pro")], async (req,res)=>{
  res.render("pro")
})
module.exports = router