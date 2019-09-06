export default function getStats(lists) {
  return lists.reduce((acc, curr) => {
    acc[curr] = require(`../assets/homeResults/${curr}`)
    return acc
  }, {})
}
