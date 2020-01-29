const { Pool } = require('pg')

// Verificación de datos de DB y creación de pool:
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('No se ha definido DATABASE_URL!')
  process.exit(1)
}
const pool = new Pool({ connectionString })




const saveUsers = async (name, surname, email, password) => {
  const client = await pool.connect();
  console.log('llegas aqui');
  let query = `SELECT email FROM runrun.organizers WHERE email = '${email}' `;

  let result = await pool.query(query);
 
  if (result.rows.length !== 0) {
    
    throw Error('Usuario existente');
  }
  console.log(name, surname, email, password);
  query = `INSERT INTO runrun.organizers (organizer_name, surname, email, hash) 
  values ('${name}', '${surname}','${email}','${password}')`;

  result = await pool.query(query);
  
  if (result.rowCount === 0) {
    throw Error('Error de inserción');
  }

  client.release();

  return;
}


const login = async (email) => {
  const client = await pool.connect();
  const query = `SELECT * FROM runrun.organizers WHERE email = '${email}'`;

  const result = await pool.query(query);
  console.log('buenas');
  if (result.rows.length === 0) {
    throw Error('Usuario incorrecto');
  }

  const user = result.rows[0];

  return user;
}

module.exports = {
  saveUsers,
  login,
  pool
}