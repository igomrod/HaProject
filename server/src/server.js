const http = require("http");
const fs = require("fs");

const express = require("express");
const multer = require("multer");
const csv = require("csvtojson");

const Router = express.Router;
const upload = multer({ dest: "src/storage/" });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 8080;

// Middleware de bodyParser, permitiendo el uso de Multer:
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Rutas para procesar datos sin Multer:
// app.post('/some_route_with_incoming_data', urlencodedParser, jsonParser, (req, res) => { 
//   ...
// }

// Endpoint para subir archivo:
router.post("/", upload.single("file"), (req, res) => {

  csv({})
    .fromFile(req.file.path)
    .then(jsonObj => {
      return new Promise((resolve, reject) => {
        console.log(jsonObj);
        res.status(200).send();
        // Procesar líneas y enviar a base de datos.
        fs.unlinkSync(req.file.path); // Borra archivo temporal.
      });
    });
});

app.use("/upload", router);

// Iniciamos el servidor:
function startServer() {
  server.listen(port, () => {
    console.log("Listening on port", port);
  });
}

setImmediate(startServer);
