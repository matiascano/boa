const db = require('../db/db')

//GETS

const getComercios = (req, res) => {
  const sql = 'SELECT * FROM comercios'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.json(result) // Corrección aquí
  })
}

const getComercioById = (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM comercios WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

const getComerciosByUserId = (req, res) => {
  const { userId } = req.params
  const sql = 'SELECT * FROM comercios WHERE userId = ?'
  db.query(sql, [userId], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

const getComerciosByName = (req, res) => {
  const { name } = req.params
  const sql = 'SELECT * FROM comercios WHERE nombre = ?'
  db.query(sql, [name], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}


const getComerciosBySlug = (req, res) => {
  const { slug } = req.params
  const sql = 'SELECT * FROM comercios WHERE slug = ?'
  db.query(sql, [slug], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

//POSTS
const addComercio = (req, res) => {
  const {
    nombre, slug, descripcion, imgPerfil, altPerfil,
    imgHeader, altHeader, domicilio, latitud, longitud,
    web, email, instagram, idUsuario, idCiudad
  } = req.body

  const sql = 'INSERT INTO comercios (nombre, slug, descripcion, imgPerfil, altPerfil, imgHeader, altHeader, domicilio, latitud, longitud, web, email, instagram, idUsuario, idCiudad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  db.query(sql, [nombre, slug, descripcion, imgPerfil, altPerfil, imgHeader, altHeader, domicilio, latitud, longitud, web, email, instagram, idUsuario, idCiudad], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}


//UPDATES
const updateComercio = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  let sql = 'UPDATE comercios SET ';
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
          console.error('Error al actualizar el comercio:', err);
          return res.status(500).json({ error: 'Error interno del servidor al actualizar el comercio.' });
      }
      res.json({ message: 'Comercio actualizado correctamente.' });
  });
};



//DELETES
const deleteComercio = (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM comercios WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

module.exports = {
  getComercios,
  getComercioById,
  getComerciosByUserId,
  getComerciosByName,
  getComerciosBySlug,
  addComercio,
  updateComercio,
  deleteComercio
}
