// app.js
// Hacemos la llamada a express
const express = require('express');

// Creamos la variable app que nos va a permitir hacer llamadas
const app = express();

//creamos el puerto
const PORT = 3000;

//hacemos el listen
app.listen(PORT, () => {
    console.log(`Servidor corriendo en la url http://localhost:${PORT}/`);
})

//Midleware
app.use(express.static('public'));

//Rutas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/mapa', (req, res) => {
    res.sendFile(__dirname + '/public/html/mapa.html');
})

app.get('/ofertas', (req, res) => {
    res.sendFile(__dirname + '/public/html/ofertas.html');
})

app.get('/comercio', (req, res) => {
    res.sendFile(__dirname + '/public/html/comercio.html');
}) 

app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/public/html/registro.html');
})

app.getMaxListeners('/back', (req, res) => {
    res.sendFile(__dirname + '/public/html/back.html');
})

app.get('/resultados', (req, res) => {
    res.sendFile(__dirname + '/public/html/resultados.html');
}) 

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html');
})