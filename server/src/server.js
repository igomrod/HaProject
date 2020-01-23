require('dotenv').config()

const fs = require('fs')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const multer = require('multer')
const upload = multer({ dest: "src/storage/" });

const csv = require('csvtojson')
const cors = require('cors')

// const utils = require('./utils')
const db = require('./db')

const Router = express.Router;
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 8080;

app.use(bodyParser.json())
app.use(cors())

// Middleware de bodyParser, permitiendo el uso de Multer:
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Rutas para procesar datos sin Multer:
// app.post('/some_route_with_incoming_data', urlencodedParser, jsonParser, (req, res) => { 
//   ...
// }

// Endpoint para subir archivo:
router.post('/upload', upload.single("file"), async (req, res) => {

  const csvObject = await csv().fromFile(req.file.path)
  try {
    const u = req.body
    const { rows } = await db.query(
      'INSERT INTO tutors(Nombre_TUTOR, Apellidos_TUTOR, Email_TUTOR, DNI_TUTOR, Relacion) ' +
      'VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [u.tutor_name, u.surname, u.email, u.dni, u.relationship]
    )
    res.json(rows[0])
  } catch (e) {
    res.status(400)
    res.json({ error: e.message })
  }
  fs.unlinkSync(req.file.path); // Borra archivo temporal.
  res.status(200).send();
});

app.use(router);

// Iniciamos el servidor:
function startServer() {
  server.listen(port, () => {
    console.log("Listening on port", port);
  });
}

setImmediate(startServer);
