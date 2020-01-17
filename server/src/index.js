const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');


const Router = express.Router;
const upload = multer({ dest: 'src/storage/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 8080

// Endpoint para subir archivo:
router.post('/', upload.single('file'), (req, res) => {
  const csvData = [];

  // Parseo del archivo subido:
  csv.fromPath(req.file.path, { headers: true })
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('end', () => {
      console.log(csvData)
      fs.unlinkSync(req.file.path); // Borra archivo temporal.
    })
});

app.use('/upload', router);

// Iniciamos el servidor:
function startServer() {
  server.listen(port, () => {
    console.log('Listening on port', port);
  });
}

setImmediate(startServer);