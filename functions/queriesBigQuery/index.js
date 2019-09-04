const path = require('path')
const { BigQuery } = require('@google-cloud/bigquery')

const bigQuery = new BigQuery({
  projectId: 'primary-opposition-2019',
  keyFilename: path.resolve(__dirname, '../config/googleCloud.json'),
})

exports.getPaginateList = async (data = {}) => {
  const {
    datasetId,
    tableId,
    config: {
      paginate = { page: 0, limit: 10 },
      filter = { name: '' },
      sort = 'orden',
    },
  } = data

  const query = `SELECT * FROM ${datasetId}.${tableId} 
  ${filter.name ? `WHERE apellidosynombre LIKE "${filter.name}%"` : ''} 
  ORDER BY ${sort} LIMIT @limit OFFSET @page`

  const options = {
    query,
    params: { limit: paginate.limit, page: paginate.page * paginate.limit },
  }

  return await bigQuery.query(options)
}
