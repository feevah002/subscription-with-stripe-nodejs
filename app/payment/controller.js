const {
  createBillingPortalSession,
  createCheckoutSession,
  addNewCustomer,
  getCustomerById,
  createWebhook
} = require("./repository")

const {
  getUser
} = require("../user/repository")

const productToPriceMap = {
  basic: process.env.PRODUCT_BASIC,
  pro: process.env.PRODUCT_PRO
}

const userRepo = require("../user/repository")

exports.checkoutSesssion = async (req,res,next)=>{

  try{
    const session = await createCheckoutSession(req.user.billingID, productToPriceMap[req.body.plan])
    res.redirect(session.url)
  } catch(err){
    res.status(500).json({
      status:false,
      msg:"an error occured, please try again",
      err:err
    })
  }
}

exports.billingSession = async(req,res,next)=>{
  try{
    const billing = await createBillingPortalSession(req.user.billingID)
    console.log(billing)
    res.redirect(billing.url)
  } catch(err){
    res.status(500).json({
      status:false,
      msg:"an error occured, please try again",
      err:err
    })
  }
}

exports.webhook = async(req,res)=>{
  let event;
  try{
    event = await createWebhook(req.body, req.header('Stripe-Signature'))
  } catch(err){
    res.status(500),json({
      status:false,
      msg:` Webhook signature verification failed:${err.message} `,
      err:err
    })
 
  }
  let subscription;
  let status;
    // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':{
      subscription = event.data.object;
      status = subscription.status;
      const user = await userRepo.getUserbyBillingId(subscription.customer)
      
      if (subscription.plan.id == process.env.PRODUCT_BASIC) {
        console.log('created')
        user.plan = 'basic'
      }

      if (subscription.plan.id === process.env.PRODUCT_PRO) {
        console.log('created')
        user.plan = 'pro'
      }
      await user.save()
      break;
    }
    case 'customer.subscription.updated':{
      subscription = event.data.object;
      status = subscription.status;
      const user = await userRepo.getUserbyBillingId(subscription.customer)
      if (subscription.plan.id == process.env.PRODUCT_BASIC) {
        console.log('updated')
        user.plan = 'basic'
      }

      if (subscription.plan.id === process.env.PRODUCT_PRO) {
        console.log('updated')
        user.plan = 'pro'
      }
      const isOnTrial = subscription.status === 'trialing'
      if (isOnTrial) {
        user.hasTrial = true
        user.endDate = new Date(subscription.current_period_end * 1000)
      } else if (subscription.status === 'active') {
        user.hasTrial = false
        user.endDate = new Date(subscription.current_period_end * 1000)
      }

      if (subscription.canceled_at) {
        console.log('cancelled')
        user.plan = 'none'
        user.hasTrial = false
        user.endDate = null
      }
      await user.save()
      break;
    }
    default:
  }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
}
