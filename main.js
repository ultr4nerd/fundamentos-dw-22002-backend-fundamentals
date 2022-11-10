const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require("./config")

require("./config/passport")

const app = express();
mongoose.connect(config.databaseUrl);
mongoose.set("debug", config.debug);

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de rutas
app.use('/v1', require('./routes/v1'));

// Escuchar peticiones
const server = app.listen(process.env.PORT || 3000, function () {
  console.log(
    'Escuchando peticiones en http://localhost:' + server.address().port + ' 🔥'
  );
});
