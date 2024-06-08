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
app.use(express.static('public'))

//Rutas
app.get('/', (req, res) => {
    res.sendFile(__dirname + './index.html')
})
