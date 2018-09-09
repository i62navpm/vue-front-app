export default function searchUtils(db) {
  async function getSearch(name, lists) {
    let data = []
    for (const list of lists) {
      data.push(getData(name, list))
    }
    return data
  }

  async function getData(name, list) {
    const data = await db.collection(list).get()
    let acc = {}

    for (const doc of data.docs) {
      let querySnapshot = await doc.ref
        .collection('opponents')
        .where('apellidosynombre', '==', name)
        .get()

      if (!querySnapshot.empty) {
        acc[doc.id] = querySnapshot.docs.map(doc => doc.data())
      }
    }
    return acc
  }

  return {
    getSearch,
  }
}
