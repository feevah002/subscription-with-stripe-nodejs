const router = require("express").Router()
const {
  login,
  register
} = require('./controller')

const {
  isLoggedIn
}= require("../middleware/index")

router.get("/", (req,res)=>{
  res.render("index")
})
router.get("/login", (req,res)=>{
  res.render("login")
})
router.post("/auth/login", login)


router.get("/register", (req,res)=>{
  res.render("register")
})
router.post("/auth/register", register)

module.exports = router