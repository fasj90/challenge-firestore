const serviceAccount = require('./config/serviceAccountKey.json');
const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
    credential:firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://test-project-71f18.firebaseio.com"
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = 3000;

app.use(bodyParser.json());

app.use('/movies', routes.movies);

app.listen(PORT, () =>{
    console.log(`Servidor esta activo en http://localhost:${PORT}`);
})