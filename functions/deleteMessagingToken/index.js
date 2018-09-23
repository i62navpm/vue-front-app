const functions = require('firebase-functions')
const axios = require('axios')
const instance = axios.create({
  baseURL: 'https://iid.googleapis.com/v1/web/iid',
})
instance.defaults.headers.common[
  'Authorization'
] = functions.config().server.key

module.exports = (data, context) => {
  instance.delete(`/${data}`)
  return true
}
