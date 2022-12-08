const User = require("./model")

exports.newUser = async (payload, password)=>{
  const data = await new User(payload)
  const regUser = await User.register(payload, password)
  return regUser
}

exports.getUserbyBillingId = async (billingId) => {
  return await User.findOne({billingId})
}

exports.updatePlan = async (id, plan) => {
  return await User.findByIdAndUpdate(id, plan)
}
