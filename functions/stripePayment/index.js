const functions = require('firebase-functions')
const tkStripe = functions.config().stripe.token
const stripe = require('stripe')(tkStripe)
const paymentType = require('./config')

module.exports = (data, context) => {
  const charge = stripe.charges.create({
    ...paymentType[data.paymentType],
    source: data.token.id,
  })

  return charge
}
