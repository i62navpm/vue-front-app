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
        acc[doc.id] = []
        for (const docOpp of querySnapshot.docs) {
          const dataOpp = docOpp.data()
          let infoSnapShot = await docOpp.ref
            .collection('positionMovements')
            .get()
          infoSnapShot = infoSnapShot.docs.map((item, index) => {
            let id = new Date(item.id)
            if (index === 0) {
              id = new Date('07/25/18')
            } else if (index === 1) {
              id = new Date('09/06/18')
            }
            return { [id.toLocaleDateString()]: item.data() }
          })
          acc[doc.id].push({ ...dataOpp, info: infoSnapShot })
        }
      }
    }
    return acc
  }

  return {
    getSearch,
  }
}
