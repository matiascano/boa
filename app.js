
// Hacemos la llamada a express
const express = require('express');

// Conectamos la base de datos
const db = require('./app/db/db');

// Limpia la caché de require
Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
});

// Llamamos a body-parser
const bodyParser = require('body-parser');
// Importamos path para manejar rutas de archivos
const path = require('path');

// Creamos la variable app que nos va a permitir hacer llamadas
const app = express();

// Creamos el puerto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON antes de definir las rutas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const comerciosRouter = require('./app/routes/comercios');
app.use('/comercios', comerciosRouter);

const usuariosRouter = require('./app/routes/usuarios');
app.use('/usuarios', usuariosRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/mapa', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'mapa.html'));
});

app.get('/ofertas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'ofertas.html'));
});

app.get('/comercio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'comercio.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'registro.html'));
});

app.get('/back', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'back.html'));
});

app.get('/resultados', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'resultados.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.use('/uploads', express.static('uploads'));

// Error 404
/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', '404.html'));
});*/

// Hacemos el listen
app.listen(PORT, () => {
    console.log(`Servidor corriendo en la url http://localhost:${PORT}/`);
});
