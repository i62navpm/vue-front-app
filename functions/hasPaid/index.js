const admin = require('firebase-admin')
const { DateTime } = require('luxon')
const db = admin.firestore()

module.exports = async (data, context) => {
  try {
    const docSnapshot = await db
      .collection('users')
      .where('email', '==', data.email)
      .get()

    let [user] = docSnapshot.docs

    user = user.data()

    if (!user.expired) return false

    return DateTime.fromMillis(user.expired) > DateTime.fromMillis(data.time)
  } catch (err) {
    return err
  }
}
