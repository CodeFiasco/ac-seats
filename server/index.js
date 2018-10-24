const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const db = require('./db/connection');
db.load();

app.prepare()
.then(() => {
  const server = express();
  server.use(bodyParser.json());

  const campusController = require('./controller/campus');
  campusController.init(server, app);
    
  server.get('*', (req, res) => {
    return handle(req, res);
  });
    
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on port: ${port}`);
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});