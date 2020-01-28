const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'runrundb',
  password: '123456',
  port: 5432,
})



const saveUsers = async (name, surname, email, password) => {
  const client = await pool.connect();

  let query = `select email from runrun.organizers where email = '${email}' `;

  let result = await pool.query(query);
 
  if (result.rows.length !== 0) {
    
    throw Error('Usuario existente');
  }
  console.log(name, surname, email, password);
  query = `insert into runrun.organizers (organizer_name, surname, email, hash) 
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
  const query = `select * from runrun.organizers where email = '${email}'`;

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
  login
}