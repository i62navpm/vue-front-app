const functions = require('firebase-functions')
const axios = require('axios')
axios.defaults.baseURL = 'https://iid.googleapis.com/iid/v1'
axios.defaults.headers.common['Authorization'] = functions.config().server.key

module.exports = (data, context) => {
  axios.post(`/${data}/rel/topics/maestros`)
  return true
}
