const db = require('../db/db')
const { promisify } = require('util') // Importa promisify
// Configuramos multer para subir archivos
const multer = require('multer')
const path = require('path')

const query = promisify(db.query).bind(db)

const handleError = (res, err) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}

// GETS
// BUSQUEDA COMERCIO DESDE MUCHOS
const searchComercios = async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).send({ message: "Query is required" });
  }

  try {
    const sql = `
      SELECT 
        c.id, c.nombre, c.slug, c.descripcion, c.img_perfil, c.alt_perfil, c.img_header, c.alt_header, 
        c.domicilio, c.latitud, c.longitud, c.web, c.email, c.instagram, c.id_usuario, c.ts, c.id_ciudad,
        ci.ciudad_nombre,
        GROUP_CONCAT(DISTINCT cat.nombre) AS categorias,
        GROUP_CONCAT(DISTINCT acc.nombre) AS accesibilidades,
        GROUP_CONCAT(DISTINCT men.nombre) AS menues
      FROM comercios c
      LEFT JOIN ciudad ci ON c.id_ciudad = ci.id
      LEFT JOIN categoria_comercio cc ON c.id = cc.id_comercio
      LEFT JOIN categorias cat ON cc.id_categoria = cat.id
      LEFT JOIN accesibilidad_comercio ac ON c.id = ac.id_comercio
      LEFT JOIN accesibilidad acc ON ac.id_accesibilidad = acc.id
      LEFT JOIN menues_comercio mc ON c.id = mc.id_comercio
      LEFT JOIN menues men ON mc.id_menu = men.id
      WHERE 
        c.nombre LIKE ? OR 
        c.descripcion LIKE ? OR
        c.domicilio LIKE ? OR 
        ci.ciudad_nombre LIKE ? OR
        cat.nombre LIKE ? OR 
        acc.nombre LIKE ? OR 
        men.nombre LIKE ?
      GROUP BY c.id, ci.ciudad_nombre
    `;

    db.query(sql, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`], (err, result) => {
      if (err) return handleError(res, err)
      res.json(result)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getComercios = (req, res) => {
  const sql = 'SELECT * FROM comercios ORDER BY id DESC'
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

const getComercioById = (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM comercios WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

const getComerciosByUserId = (req, res) => {
  const { userId } = req.params
  const sql = 'SELECT * FROM comercios WHERE idUsuario = ?'
  db.query(sql, [userId], (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

const getComerciosByName = (req, res) => {
  const { name } = req.params
  const sql = 'SELECT * FROM comercios WHERE nombre = ?'
  db.query(sql, [name], (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

const getComerciosBySlug = (req, res) => {
  const { slug } = req.params
  const sql = 'SELECT * FROM comercios WHERE slug = ?'
  db.query(sql, [slug], (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// POSTS
// Configuración de multer para almacenar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const addComercio = (req, res) => {
  upload.fields([{ name: 'imgPerfil' }, { name: 'imgHeader' }])(req, res, (err) => {
    if (err) {
      return handleError(res, err)
    }
  let {
      nombre, descripcion, altPerfil, altHeader, domicilio, latitud, longitud,
      web, email, instagram, idCiudad, categorias, accesibilidad, menues
    } = req.body

  // Si categorias, accesibilidad o menues no existen, ponemos un array vacío
  if (!categorias) categorias = [];
  if (!accesibilidad) accesibilidad = [];
  if (!menues) menues = [];

    // Si categorias, accesibilidad o menues es un string, lo convertimos en un array con un solo elemento
    if (typeof categorias === 'string') categorias = [categorias];
    if (typeof accesibilidad === 'string') accesibilidad = [accesibilidad];
    if (typeof menues === 'string') menues = [menues]

    // Convertimos los arrays de categorías, accesibilidad y menues con valores numéricos
    categorias = categorias.map(item => parseInt(item))
    accesibilidad = accesibilidad.map(item => parseInt(item))
    menues = menues.map(item => parseInt(item))

    // Slug
    const slug = nombre.toLowerCase().replace(/ /g, '-')

    // Por el momento ponemos el id de usuario a todos los comercios
    const idUsuario = 1

    // Obtener URLs de imágenes subidas
    const imgPerfilUrl = req.files.imgPerfil ? `/uploads/${req.files.imgPerfil[0].filename}` : 'https://via.placeholder.com/1920x1080'
    const imgHeaderUrl = req.files.imgHeader ? `/uploads/${req.files.imgHeader[0].filename}` : 'https://via.placeholder.com/350x150'

    // Insertar comercio
    const sqlComercio = 'INSERT INTO comercios (nombre, slug, descripcion, imgPerfil, altPerfil, imgHeader, altHeader, domicilio, latitud, longitud, web, email, instagram, idUsuario, idCiudad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sqlComercio, [nombre, slug, descripcion, imgPerfilUrl, altPerfil, imgHeaderUrl, altHeader, domicilio, latitud, longitud, web, email, instagram, idUsuario, idCiudad], (err, result) => {
      if (err) return handleError(res, err)

      // Una vez obtenemos el id del comercio, actualizamos la categoría, accesibilidad y el menú correspondiente
      const idComercio = result.insertId

      // Insertar categorías
      if (categorias && categorias.length > 0) {
        const sqlCategorias = 'INSERT INTO categoria_comercio (idComercio, idCategoria) VALUES ?'
        const categoriasValues = categorias.map(idCategoria => [idComercio, idCategoria])
        db.query(sqlCategorias, [categoriasValues], (err, result) => {
          if (err) return handleError(res, err)
        })
      }

      // Insertar accesibilidad
      if (accesibilidad && accesibilidad.length > 0) {
        const sqlAccesibilidad = 'INSERT INTO accesibilidad_comercio (idComercio, idAccesibilidad) VALUES ?'
        const accesibilidadValues = accesibilidad.map(idAccesibilidad => [idComercio, idAccesibilidad])
        db.query(sqlAccesibilidad, [accesibilidadValues], (err, result) => {
          if (err) return handleError(res, err)
        })
      }

      // Insertar menús
      if (menues && menues.length > 0) {
        const sqlMenues = 'INSERT INTO menues_comercio (idComercio, idMenu) VALUES ?'
        const menuesValues = menues.map(idMenu => [idComercio, idMenu])
        db.query(sqlMenues, [menuesValues], (err, result) => {
          if (err) return handleError(res, err)
        })
      }

      res.json({ message: 'Comercio creado correctamente' })
    })
  })
}


// Obtener categorías
const getCategories = (req, res) => {
  const sql = 'SELECT * FROM categorias ORDER BY nombre' // Asegúrate que la tabla es "categorias"
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// Obtener categorías por comercio
const getCategoriesByCommerce = (req, res) => {
  const { id } = req.params
  const sql = 'SELECT nombre FROM categorias WHERE id IN ( SELECT idCategoria FROM categoria_comercio     WHERE idComercio = ? )'
  db.query(sql, [id], (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// Obtener menús
const getMenus = (req, res) => {
  const sql = 'SELECT * FROM menues ORDER BY nombre'
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// Obtener accesibilidad
const getAccessibility = (req, res) => {
  const sql = 'SELECT * FROM accesibilidad ORDER BY nombre'
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// Obtener provincias
const getProvinces = (req, res) => {
  const sql = 'SELECT * FROM provincia ORDER BY provincia_nombre'
  db.query(sql, (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// Obtener ciudades por ID de provincia
const getCities = (req, res) => {
  const { province } = req.params
  const sql = 'SELECT * FROM ciudad WHERE provincia_id = ? ORDER BY ciudad_nombre'
  db.query(sql, [province], (err, result) => {
    if (err) return handleError(res, err)
    res.json(result)
  })
}

// PUT
const updateComercio = async (req, res) => {
  upload.fields([{ name: 'imgPerfil' }, { name: 'imgHeader' }])(req, res, async (err) => {
    if (err) {
      return handleError(res, err)
    }

    const { id } = req.params
    let {
      nombre, descripcion, altPerfil, altHeader, domicilio, latitud, longitud,
      web, email, instagram, idCiudad, categorias, accesibilidad, menues
    } = req.body

    // Si categorias, accesibilidad o menues no existen, ponemos un array vacío
    if (!categorias) categorias = [];
    if (!accesibilidad) accesibilidad = [];
    if (!menues) menues = [];

    // Si categorias, accesibilidad o menues es un string, lo convertimos en un array con un solo elemento
    if (typeof categorias === 'string') categorias = [categorias];
    if (typeof accesibilidad === 'string') accesibilidad = [accesibilidad];
    if (typeof menues === 'string') menues = [menues]

    // Convertimos los arrays de categorías, accesibilidad y menues con valores numéricos
    categorias = categorias.map(item => parseInt(item))
    accesibilidad = accesibilidad.map(item => parseInt(item))
    menues = menues.map(item => parseInt(item))

    // Slug
    const slug = nombre.toLowerCase().replace(/ /g, '-')

    // Obtener URLs de imágenes subidas
    const imgPerfilUrl = req.files.imgPerfil ? `/uploads/${req.files.imgPerfil[0].filename}` : null
    const imgHeaderUrl = req.files.imgHeader ? `/uploads/${req.files.imgHeader[0].filename}` : null

    try {
      // Actualizar comercio
      let updateFields = []
      let updateValues = []
      if (nombre) { updateFields.push('nombre = ?'); updateValues.push(nombre) }
      if (slug) { updateFields.push('slug = ?'); updateValues.push(slug) }
      if (descripcion) { updateFields.push('descripcion = ?'); updateValues.push(descripcion) }
      if (altPerfil) { updateFields.push('altPerfil = ?'); updateValues.push(altPerfil) }
      if (altHeader) { updateFields.push('altHeader = ?'); updateValues.push(altHeader) }
      if (domicilio) { updateFields.push('domicilio = ?'); updateValues.push(domicilio) }
      if (latitud) { updateFields.push('latitud = ?'); updateValues.push(latitud) }
      if (longitud) { updateFields.push('longitud = ?'); updateValues.push(longitud) }
      if (web) { updateFields.push('web = ?'); updateValues.push(web) }
      if (email) { updateFields.push('email = ?'); updateValues.push(email) }
      if (instagram) { updateFields.push('instagram = ?'); updateValues.push(instagram) }
      if (idCiudad) { updateFields.push('idCiudad = ?'); updateValues.push(idCiudad) }
      if (imgPerfilUrl) { updateFields.push('imgPerfil = ?'); updateValues.push(imgPerfilUrl) }
      if (imgHeaderUrl) { updateFields.push('imgHeader = ?'); updateValues.push(imgHeaderUrl) }
      
      updateValues.push(id)

      const sqlUpdateComercio = `UPDATE comercios SET ${updateFields.join(', ')} WHERE id = ?`
      await query(sqlUpdateComercio, updateValues)

      // Eliminar relaciones existentes
      await query('DELETE FROM categoria_comercio WHERE idComercio = ?', [id])
      await query('DELETE FROM accesibilidad_comercio WHERE idComercio = ?', [id])
      await query('DELETE FROM menues_comercio WHERE idComercio = ?', [id])

      // Insertar categorías
      if (categorias.length > 0) {
        const sqlCategorias = 'INSERT INTO categoria_comercio (idComercio, idCategoria) VALUES ?'
        const categoriasValues = categorias.map(idCategoria => [id, idCategoria])
        await query(sqlCategorias, [categoriasValues])
      }

      // Insertar accesibilidad
      if (accesibilidad.length > 0) {
        const sqlAccesibilidad = 'INSERT INTO accesibilidad_comercio (idComercio, idAccesibilidad) VALUES ?'
        const accesibilidadValues = accesibilidad.map(idAccesibilidad => [id, idAccesibilidad])
        await query(sqlAccesibilidad, [accesibilidadValues])
      }

      // Insertar menús
      if (menues.length > 0) {
        const sqlMenues = 'INSERT INTO menues_comercio (idComercio, idMenu) VALUES ?'
        const menuesValues = menues.map(idMenu => [id, idMenu])
        await query(sqlMenues, [menuesValues])
      }

      res.json({ message: 'Comercio actualizado correctamente' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Error al actualizar el comercio' })
    }
  })
}

// DELETES
const deleteComercio = (req, res) => {
  const { id } = req.params

  const deleteCategoriesSql = 'DELETE FROM categoria_comercio WHERE idComercio = ?'
  const deleteAccessibilitySql = 'DELETE FROM accesibilidad_comercio WHERE idComercio = ?'
  const deleteMenusSql = 'DELETE FROM menues_comercio WHERE idComercio = ?'
  const deleteComercioSql = 'DELETE FROM comercios WHERE id = ?'

  db.query(deleteCategoriesSql, [id], (err, result) => {
    if (err) return handleError(res, err)

    db.query(deleteAccessibilitySql, [id], (err, result) => {
      if (err) return handleError(res, err)

      db.query(deleteMenusSql, [id], (err, result) => {
        if (err) return handleError(res, err)

        db.query(deleteComercioSql, [id], (err, result) => {
          if (err) return handleError(res, err)
          res.json({ message: 'Comercio eliminado correctamente' })
        })
      })
    })
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
  getCategoriesByCommerce,
  searchComercios,
  deleteComercio
}
