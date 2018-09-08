export default function statsUtils(db) {
  async function getStats(lists) {
    let data = {}

    for (const list of lists) {
      data[list] = await getData(list)
    }

    return data
  }

  async function getData(list) {
    let data = await db.collection(list).get()
    data = data.docs.reduce((acc, curr) => {
      acc[curr.id] = curr.data()
      return acc
    }, {})
    return data
  }

  return {
    getStats,
  }
}
