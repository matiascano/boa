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

const getComerciosByAccessibility = (req, res) => {
  const { accessibility } = req.params
  const sql = 'SELECT * FROM comercios WHERE accessibility = ?'
  db.query(sql, [accessibility], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

const getComerciosByMenu = (req, res) => {
  const { menu } = req.params
  const sql = 'SELECT * FROM comercios WHERE menu = ?'
  db.query(sql, [menu], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

const getComerciosByName = (req, res) => {
  const { name } = req.params
  const sql = 'SELECT * FROM comercios WHERE name = ?'
  db.query(sql, [name], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

const getComerciosByCategory = (req, res) => {
  const { category } = req.params
  const sql = 'SELECT * FROM comercios WHERE category = ?'
  db.query(sql, [category], (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

const getComerciosByCity = (req, res) => {
  const { city } = req.params
  const sql = 'SELECT * FROM comercios WHERE city = ?'
  db.query(sql, [city], (err, result) => {
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


//PUTS

//DELETES

module.exports = {
  getComercios,
  getComercioById,
  getComerciosByUserId,
  getComerciosByAccessibility,
  getComerciosByMenu,
  getComerciosByName,
  getComerciosByCategory,
  getComerciosByCity,
  getComerciosBySlug,
  addComercio
}
