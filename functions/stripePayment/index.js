const functions = require('firebase-functions')
const { DateTime } = require('luxon')
const tkStripe = functions.config().stripe.token
const stripe = require('stripe')(tkStripe)
const paymentType = require('./config')
const months = { monthly: 1, termly: 3 }

module.exports = (data, context) => {
  const charge = stripe.charges.create({
    ...paymentType[data.paymentType],
    source: data.token.id,
    receipt_email: data.token.email,
  })
  const expired = DateTime.fromMillis(data.token.created * 1000).plus({
    months: months[data.paymentType],
  }).ts

  return { charge, expired }
}
