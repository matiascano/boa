//conexión a base de datos
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'boaDB'
})

connection.connect((err) => {
    if (err) {
        console.log('Error al conectar a la base de datos', err)
    }
    console.log('Conectado a la base de datos')
})

module.exports = connection
