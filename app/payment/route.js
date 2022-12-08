const { 
  webhook,
  billingSession,
  checkoutSesssion,
} = require("./controller");
const {
  isLoggedIn
}= require("../middleware/index")
const router = require("express").Router()

router.post("/checkout", isLoggedIn,checkoutSesssion)
router.post("/billing", isLoggedIn,billingSession)
router.post("/webhook", webhook)
router.get("/success", isLoggedIn, (req,res)=>{
  res.render("success")
})
router.get("/cancel", isLoggedIn,(req,res)=>{
  res.render("cancel")
})


module.exports = router