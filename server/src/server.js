require('dotenv').config()

const fs = require('fs')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const multer = require('multer')
const upload = multer({ dest: "src/storage/" });

const csv = require('csvtojson')
const cors = require('cors')

const db = require('./db')

const routes = require('./routes/user')
const app = express();

const server = http.createServer(app);
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// Endpoint para subir archivo:
app.post('/upload', upload.single("file"), async (req, res) => {

  const csvObject = await csv({ ignoreEmpty: true }).fromFile(req.file.path)
  console.log(csvObject);
  try {
    const client = await db.pool.connect()
    const arrCSV = [];
    csvObject.forEach((element) => {
      // Cargar todos los participantes:
      const insertParticipant = db.pool.query(
        'INSERT INTO runrun.participants (participant_name, surname, dni, email, gender, birthdate, team, number_type) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [element.Nombre_CORREDOR, element.Apellidos_CORREDOR, element.DNI_CORREDOR, element.Email_CORREDOR,
        element.Sexo_CORREDOR, element.Fecha_nacimiento_CORREDOR, element.Nombre_EQUIPO, element.Tipo_DORSAL]);
      arrCSV.push(insertParticipant);
    });
    Promise.all(arrCSV).then(
      response => {
        const arrCSV = [];
        // Buscar si tiene tutor:
        csvObject.forEach((element) => {
          if (element.Nombre_TUTOR) {
            const searchTutor = db.pool.query(`SELECT id_participant FROM runrun.participants WHERE participant_name = 
            '${element.Nombre_TUTOR}' AND surname = '${element.Apellidos_TUTOR}' AND email = 
            '${element.Email_TUTOR}'`);
            // Actualizamos el participante con el ID del corredor que será su tutor:
            let assignTutor = db.pool.query(`UPDATE runrun.participants SET id_tutor = '${searchTutor}' WHERE participant_name =
            '${element.Nombre_CORREDOR}' AND surname = '${element.Apellidos_CORREDOR}' AND email =
            '${element.Email_CORREDOR}' AND birthdate = '${element.Fecha_nacimiento_CORREDOR}`);
            arrCSV.push(assignTutor);
          }
          Promise.all(arrCSV).then(
            response => {
              fs.unlinkSync(req.file.path); // Borra archivo temporal.
             res.send();
            },
            err => res.status(500).send(err.message)
          )
        });
      },
      err => res.status(500).send(err.message)
    )

  } catch (e) {
    res.status(400)
    res.json({ error: e.message })
  }
});

app.use('/',routes);

// Iniciamos el servidor:
function startServer() {
  server.listen(port, () => {
    console.log("Listening on port", port);
  });
}

setImmediate(startServer);
