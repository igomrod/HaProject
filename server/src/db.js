const { Pool } = require('pg')

// Verificación de datos de DB y creación de pool:
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('No se ha definido DATABASE_URL!')
  process.exit(1)
}
const pool = new Pool({ connectionString })

module.exports = {
  pool
}

