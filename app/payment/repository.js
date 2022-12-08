const stripe = require("stripe")

const Stripe = stripe(process.env.STRIPE_SECRET_KEY)

exports.createCheckoutSession = async (stripeBillingId, plan_price)=>{
  const session = await Stripe.checkout.sessions.create({
    mode:"subscription",
    customer: stripeBillingId,
    billing_address_collection:"auto",
    line_items:[
      {
        price:plan_price,
        quantity:1
      },
    ],
    success_url: `${process.env.YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.YOUR_DOMAIN}/cancel`,
  })
  return session
}

exports.
createBillingPortalSession = async (stripeBillingId)=>{
  const portalSession = await Stripe.billingPortal.sessions.create({
    customer: stripeBillingId,
    return_url: 'https://localhost:7000'
  })
  return portalSession
}

exports.getCustomerById = async (id)=>{
  const customer = await Stripe.customers.retrieve(id)
  return customer
}

exports.addNewCustomer = async (email)=>{
  const customer = await Stripe.customers.create({email})
  return customer;
}

exports.createWebhook = async (rawBody, sig)=>{
  const event = await Stripe.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.WEBHOOK_SECRET_KEY
  )
  return event
}