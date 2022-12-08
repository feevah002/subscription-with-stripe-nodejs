exports.isLoggedIn = async (req,res,next)=>{
  if(req.isAuthenticated()){
    next()
  }else{
    res.redirect("/login")
  }
  
}
exports.hasPlan= (plan)=>{
  return async (req, res, next) => {
    if (req.user && req.user.plan == plan) {
      next()
    } else {
      res.status(401).send('Unauthorized').end()
    }
  }
}

