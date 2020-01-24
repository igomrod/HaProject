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

  const csvObject = await csv({ ignoreEmpty: true }).fromFile(req.file.path)
  console.log(csvObject);
  try {
    const client = await db.pool.connect()
    const arrCSV = [];
    csvObject.forEach((element) => {
      if (element.Nombre_TUTOR) {
        const resultTutor = db.pool.query('INSERT INTO runrun.tutors (tutor_name, surname, email, dni, relationship) ' +
          'VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [element.Nombre_TUTOR, element.Apellidos_TUTOR, element.Email_corredor, element.DNI_TUTOR, element.Relacion]);
        arrCSV.push(resultTutor);
      }
      const resultParticipant = db.pool.query(
        'INSERT INTO runrun.participants (participant_name, surname, email, gender, birthdate, team ) ' +
        'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [element.Nombre_corredor, element.Apellidos_corredor, element.Email_corredor, element.Sexo_corredor, element.Fecha_nacimiento_corredor, element.Nombre_equipo]);
      arrCSV.push(resultParticipant);
    });
    Promise.all(arrCSV).then(
      res => {
        client.release();
        res.send();
      },
      err => res.send(err)
    )

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
