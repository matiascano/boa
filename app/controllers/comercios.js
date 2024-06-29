const db = require('../db/db')

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};

//GETS

const getComercios = (req, res) => {
  const sql = 'SELECT * FROM comercios'
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err);
    res.json(result)
  })
}

const getComercioById = (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM comercios WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) return handleError(res, err);
    res.json(result)
  })
}

const getComerciosByUserId = (req, res) => {
  const { userId } = req.params
  const sql = 'SELECT * FROM comercios WHERE userId = ?'
  db.query(sql, [userId], (err, result) => {
    if (err) return handleError(res, err);
    res.json(result)
  })
}

const getComerciosByName = (req, res) => {
  const { name } = req.params
  const sql = 'SELECT * FROM comercios WHERE nombre = ?'
  db.query(sql, [name], (err, result) => {
    if (err) return handleError(res, err);
    res.json(result)
  })
}


const getComerciosBySlug = (req, res) => {
  const { slug } = req.params
  const sql = 'SELECT * FROM comercios WHERE slug = ?'
  db.query(sql, [slug], (err, result) => {
    if (err) return handleError(res, err);
    res.json(result)
  })
}

//POSTS
const addComercio = (req, res) => {
  let {
      nombre, descripcion, altPerfil, altHeader, domicilio, latitud, longitud,
      web, email, instagram, idCiudad, categorias, accesibilidad, menues
  } = req.body;

  // Si categorias, accesibilidad o menues no existen, ponemos un array vacío
  if (!categorias) categorias = [];
  if (!accesibilidad) accesibilidad = [];
  if (!menues) menues = [];

  // Si categorias, accesibilidad o menues es un string, lo convertimos en un array con un solo elemento
  if (typeof categorias === 'string') categorias = [categorias];
  if (typeof accesibilidad === 'string') accesibilidad = [accesibilidad];
  if (typeof menues === 'string') menues = [menues];

  // Converimos los arrays de categorías, accesibilidad y menues con valores numéricos
  categorias = categorias.map((item) => {
      return parseInt(item);
  });
  accesibilidad = accesibilidad.map((item) => {
      return parseInt(item);
  });
  menues = menues.map((item) => {
      return parseInt(item);
  });


  // Slug

  const slug = nombre.toLowerCase().replace(/ /g, '-');

  // Por el momento ponemos el id de usuario a todos los comercios
  const idUsuario = 1;



  // Ponemos url de imagen por defecto
  const imgHeader = 'https://via.placeholder.com/350x150';
  const imgPerfil = 'https://via.placeholder.com/1920x1080';

  // Insertar comercio
  const sqlComercio = 'INSERT INTO comercios (nombre, slug, descripcion, imgPerfil, altPerfil, imgHeader, altHeader, domicilio, latitud, longitud, web, email, instagram, idUsuario, idCiudad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sqlComercio, [nombre, slug, descripcion, imgPerfil, altPerfil, imgHeader, altHeader, domicilio, latitud, longitud, web, email, instagram, idUsuario, idCiudad], (err, result) => {
      if (err) return handleError(res, err);;

      // Una vez obtenemos el id del comercio, actualizamos la categoría, accesibilidad y el menú correspondiente
      const idComercio = result.insertId;

      // Insertar categorías
      if (categorias && categorias.length > 0) {
          const sqlCategorias = 'INSERT INTO categoria_comercio (idComercio, idCategoria) VALUES ?';
          const categoriasValues = categorias.map(idCategoria => [idComercio, idCategoria]);
          db.query(sqlCategorias, [categoriasValues], (err, result) => {
              if (err) return handleError(res, err);;
          });
      }

      // Insertar accesibilidad
      if (accesibilidad && accesibilidad.length > 0) {
          const sqlAccesibilidad = 'INSERT INTO accesibilidad_comercio (idComercio, idAccesibilidad) VALUES ?';
          const accesibilidadValues = accesibilidad.map(idAccesibilidad => [idComercio, idAccesibilidad]);
          db.query(sqlAccesibilidad, [accesibilidadValues], (err, result) => {
              if (err) return handleError(res, err);;
          });
      }

      // Insertar menús
      if (menues && menues.length > 0) {
          const sqlMenues = 'INSERT INTO menues_comercio (idComercio, idMenu) VALUES ?';
          const menuesValues = menues.map(idMenu => [idComercio, idMenu]);
          db.query(sqlMenues, [menuesValues], (err, result) => {
              if (err) return handleError(res, err);;
          });
      }

      res.json({ 'message': 'Comercio creado correctamente' });
  });
};





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



// Controlador de prueba
const holaMundo = (req, res) => {
  res.send('hola mundo');
}

// Obtener categorías
const getCategories = (req, res) => {
  const sql = 'SELECT * FROM categorias ORDER BY nombre'; // Asegúrate que la tabla es "categorias"
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err);
    res.json(result);
  });
}

// Obtener categorías por comercio
const getCategoriesByCommerce = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT nombre FROM categorias WHERE id IN ( SELECT idCategoria FROM categoria_comercio     WHERE idComercio = ? )';
  db.query(sql, [id], (err, result) => {
    if (err) return handleError(res, err);
    res.json(result);
  });

}

// Obtener menús
const getMenus = (req, res) => {
  const sql = 'SELECT * FROM menues ORDER BY nombre';
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err);
    res.json(result);
  });
}

// Obtener accesibilidad
const getAccessibility = (req, res) => {
  const sql = 'SELECT * FROM accesibilidad ORDER BY nombre';
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err);
    res.json(result);
  });
}

// Obtener provincias
const getProvinces = (req, res) => {
  const sql = 'SELECT * FROM provincia ORDER BY provincia_nombre';
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err);
    res.json(result);
  });
}

// Obtener ciudades por ID de provincia
const getCities = (req, res) => {
  const { province } = req.params;
  const sql = 'SELECT * FROM ciudad WHERE provincia_id = ? ORDER BY ciudad_nombre';
  db.query(sql, [province], (err, result) => {
    if (err) return handleError(res, err);
    res.json(result);
  });
}



//DELETES
const deleteComercio = (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM comercios WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) return handleError(res, err);
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
  getCategories,
  getMenus,
  getAccessibility,
  getProvinces,
  getCities,
  holaMundo,
  getCategoriesByCommerce,
  deleteComercio
}
