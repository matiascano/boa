const db = require('../db/db')

const addUsuario = (req, res) => {
    const {
        nombre, email, password, idRol
    } = req.body

    const sql = 'INSERT INTO usuarios (nombre, email, password, idRol) VALUES (?, ?, ?, ?)'
    db.query(sql, [nombre, email, password, idRol], (err, result) => {
        if (err) throw err
        res.json(result)
    })
}


const updateUsuario = (req, res) => {
    const { id } = req.params;
    const fieldsToUpdate = req.body;
  
    let sql = 'UPDATE usuarios SET ';
    let values = [];
    let updateFields = [];
  
    // Construir la consulta SQL y los valores a actualizar
    Object.keys(fieldsToUpdate).forEach(key => {
        if (key !== 'id') { // No permitir actualizar el ID
            updateFields.push(`${key} = ?`);
            values.push(fieldsToUpdate[key]);
        }
    });
  
    // Si no se proporcionan campos para actualizar, devolver un error
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos para actualizar.' });
    }
  
    sql += updateFields.join(', ') + ' WHERE id = ?';
    values.push(id);
  
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor al actualizar el usuario.' });
        }
        res.json({ message: 'usuario actualizado correctamente.' });
    });
  };

const deleteUsuario = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM usuarios WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) throw err
        res.json(result)
    })
}

const getUsuarioById = (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM usuarios WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) throw err
        res.json(result)
    })
}

const getUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
}

const login = (req, res) => {
    const { email, password } = req.body
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?'
    db.query(sql, [email, password], (err, result) => {
        if (err) throw err
        res.json(result)
    })
}

module.exports = {
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioById,
    getUsuarios,
    login
}