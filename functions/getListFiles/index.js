const { Storage } = require('@google-cloud/storage')

module.exports = async (data) => {
  const storage = new Storage()
  const prefix = data + '/'

  try {
    const [files] = await storage
      .bucket('primary-opposition-2019.appspot.com')
      .getFiles({
        prefix,
      })

    const result = files
      .filter(file => file.name.includes('.pdf'))
      .map(file => file.name.replace(prefix, '').replace('.pdf', ''))
    return result
  } catch (err) {
    return err
  }
}
