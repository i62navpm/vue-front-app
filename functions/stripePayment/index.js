const admin = require('firebase-admin')
const functions = require('firebase-functions')
const { DateTime } = require('luxon')
const tkStripe = functions.config().stripe.token
const stripe = require('stripe')(tkStripe)
const paymentType = require('./config')
const months = { monthly: 1, termly: 3 }
const db = admin.firestore()

module.exports = async (data, context) => {
  try {
    const charge = await stripe.charges.create({
      ...paymentType[data.paymentType],
      source: data.token.id,
      receipt_email: data.token.email,
    })

    const expired = DateTime.fromMillis(data.token.created * 1000).plus({
      months: months[data.paymentType],
    }).ts

    const docSnapshot = await db
      .collection('users')
      .where('email', '==', data.token.email)
      .get()

    const [user] = docSnapshot.docs

    let batch = db.batch()
    batch.update(user.ref, { expired })

    const paymentRef = user.ref
      .collection('payments')
      .doc(new Date().toISOString())

    batch.set(paymentRef, charge)

    await batch.commit()
    return { charge, expired }
  } catch (err) {
    return err
  }
}
