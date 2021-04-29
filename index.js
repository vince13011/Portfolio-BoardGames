/*
 dotenv est un module sans dépendance qui charge les variables d'environnement à partir 
d'un fichier .env dans process.env.
*/
require('dotenv').config();

const express = require('express');

const app = express();

//bodysanitizer est un middleware qui vient "nettoyer" les données reçu par l'api en cas de tentative d'injection de code
const sanitizer = require('./app/services/bodySanitizer');

// Si nous n'avons pas créer de fichier .env le port par défaut sera le port 4000
const port = process.env.PORT || 4000;


const apiRouter = require('./app/router');

//express.json est un bodyParser qui retourne un middleware qui analyse du json
app.use(express.json())


app.use(sanitizer);

// on dit à express d'utiliser notre router avec un sufix v1 pour préciser la  version de notre API
app.use('/v1', apiRouter);


app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));