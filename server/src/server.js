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

// Endpoint para crear evento:





// Endpoint para subir archivo:
router.post('/upload', upload.single("file"), async (req, res) => {

  const csvObject = await csv({ ignoreEmpty: true }).fromFile(req.file.path)
  console.log(csvObject);
  try {
    const client = await db.pool.connect()
    const arrCSV = [];
    csvObject.forEach((element) => {
      // Cargar todos los participantes:
      const insertParticipant = db.pool.query(
        'INSERT INTO runrun.participants (participant_name, surname, dni, email, gender, birthdate, team) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [element.Nombre_CORREDOR, element.Apellidos_CORREDOR, element.DNI_CORREDOR, element.Email_CORREDOR,
        element.Sexo_CORREDOR, element.Fecha_nacimiento_CORREDOR, element.Nombre_EQUIPO]);
      arrCSV.push(insertParticipant);
    });
    Promise.all(arrCSV).then(
      res => {
        const arrCSV = [];
        // Buscar si tiene tutor:
        csvObject.forEach((element) => {
          if (element.Nombre_TUTOR) {
            const searchTutor = db.pool.query(`SELECT id_participant FROM runrun.participants WHERE participant_name = 
            '${element.Nombre_CORREDOR}' AND participant_surname = '${element.Apellidos_TUTOR}' AND participant_email = 
            '${element.Email_TUTOR}'`);
            // Actualizamos el participante con el ID del corredor que será su tutor:
            let assignTutor = db.pool.query(`UPDATE runrun.participants SET id_tutor = '${searchTutor}' WHERE participant_name =
            '${element.Nombre_corredor}' AND participant_surname = '${element.Apellidos_corredor}' AND participant_email =
            '${element.Email_corredor}' AND participant_birthdate = '${element.Fecha_nacimiento_corredor}`);
            arrCSV.push(assignTutor);
          }
          Promise.all(arrCSV).then(
            res => {
              client.release();
              res.send();
            },
            err => res.send(err)
          )
        });
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
