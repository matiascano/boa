//conexión a base de datos
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'boaDB'
})

connection.connect((err) => {
    if (err) {
        console.log('Error al conectar a la base de datos', err)
    }
    console.log('Conectado a la base de datos')
})

module.exports = connection
