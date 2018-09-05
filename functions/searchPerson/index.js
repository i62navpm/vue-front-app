const people = require('./people')
const Fuse = require('fuse.js')

module.exports = (data, context) => {
  const options = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['apellidosynombre', 'nombre', 'apellidos', 'dni'],
  }
  const fuse = new Fuse(people, options)
  return fuse.search(data).slice(0, 10)
}
