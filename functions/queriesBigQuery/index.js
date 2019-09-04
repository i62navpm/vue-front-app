const path = require('path')
const { BigQuery } = require('@google-cloud/bigquery')

const bigQuery = new BigQuery({
  projectId: 'primary-opposition-2019',
  keyFilename: path.resolve(__dirname, '../config/googleCloud.json'),
})

async function existsDateColumn(data = {}) {
  const { datasetId, tableId } = data

  const query = `SELECT data_type
  FROM ${datasetId}.INFORMATION_SCHEMA.COLUMNS
  where table_name="${tableId}" and data_type = "DATE"`

  const options = {
    query,
  }

  return bigQuery.query(options)
}

exports.getDatesList = async (data = {}) => {
  const { datasetId, tableId } = data

  const query = `SELECT DISTINCT(date) FROM ${datasetId}.${tableId} WHERE date <= CURRENT_DATE() order by date`

  const options = {
    query,
  }
  const [dates] = await existsDateColumn(data)
  return dates.length ? await bigQuery.query(options) : Promise.resolve([])
}

exports.getPaginateList = async (data = {}) => {
  const {
    datasetId,
    tableId,
    config: {
      paginate = { page: 0, limit: 10 },
      filter = { name: '', date: '' },
      sort = 'orden',
      order = 'ASC',
    },
  } = data

  const query = `SELECT * FROM ${datasetId}.${tableId} 
  WHERE apellidosynombre LIKE "${filter.name}%" ${
    filter.date ? `AND date = "${filter.date}"` : ''
  } 
  ORDER BY ${sort} ${order} LIMIT @limit OFFSET @page`

  const options = {
    query,
    params: { limit: paginate.limit, page: paginate.page * paginate.limit },
  }

  return await bigQuery.query(options)
}
