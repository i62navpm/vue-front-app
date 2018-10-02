const functions = require('firebase-functions')
const axios = require('axios')
const instance = axios.create({
  baseURL: 'https://iid.googleapis.com/iid/v1',
})
instance.defaults.headers.common[
  'Authorization'
] = functions.config().server.key

module.exports = (data, context) => {
  try {
    instance.post(`/${data}/rel/topics/listandome-maestros`)
    return true
  } catch (err) {
    return err
  }
}
