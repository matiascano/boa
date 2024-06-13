exports.getData = (req, res) => {
  res.json(comercios);
};

// Obtenemos datos de los comercios
exports.getComercios = (req, res) => {
  res.json(comercios);
};

exports.getComercioById = (req, res) => {
  const id = parseInt(req.params.id);
  const comercio = comercios.find(com => com.id === id);
  if (comercio) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercio no encontrado');
  }
};

// Obtener comercios por user id
exports.getComerciosByUserId = (req, res) => {
  const userId = parseInt(req.params.userId);
  const comercio = comercios.filter(com => com.userId === userId);
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para el usuario');
  }
};

// Obtener comercios por accesibilidad
exports.getComerciosByAccessibility = (req, res) => {
  const accessibility = req.params.accessibility.toLowerCase();
  const comercio = comercios.filter(com => com.accessibility.some(accessibilityItem => accessibilityItem.toLowerCase() === accessibility));
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para la accesibilidad');
  }
};

// Obtener comercios por menú
exports.getComerciosByMenu = (req, res) => {
  const menu = req.params.menu.toLowerCase();
  const comercio = comercios.filter(com => com.menu.some(menuItem => menuItem.toLowerCase() === menu));
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para el menú');
  }
};


// Obtener comercios por nombre
exports.getComerciosByName = (req, res) => {
  const name = req.params.name.toLowerCase();
  const comercio = comercios.filter(com => com.name.toLowerCase().includes(name));
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para el nombre');
  }
};

// Obtener comercios por categoría
exports.getComerciosByCategory = (req, res) => {
  const category = req.params.category.toLowerCase();
  const comercio = comercios.filter(com => com.category.toLowerCase() === category);
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para la ciudad');
  }
};

// Obtener comercios por ciudad
exports.getComerciosByCity = (req, res) => {
  const city = req.params.city.toLowerCase();
  const comercio = comercios.filter(com => com.city.toLowerCase() === city);
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para la ciudad');
  }
};

// Obtener comercios por slug
exports.getComerciosBySlug = (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const comercio = comercios.filter(com => com.slug.toLowerCase() === slug);
  if (comercio.length > 0) {
      res.json(comercio);
  } else {
      res.status(404).send('Comercios no encontrados para el slug');
  }
};

//Post para crear comercio
exports.addCommerce = (req, res) => {
  const {
      id,
      userId,
      name,
      slug,
      profileImage,
      headerImage,
      headerImageAltText,
      category,
      accessibility,
      menu,
      province,
      city,
      address,
      embedMap,
      phone,
      site,
      instagram,
      email,
      description,
      offers,
      offersData
  } = req.body;

  console.log({
      id,
      userId,
      name,
      slug,
      profileImage,
      headerImage,
      headerImageAltText,
      category,
      accessibility,
      menu,
      province,
      city,
      address,
      embedMap,
      phone,
      site,
      instagram,
      email,
      description,
      offers,
      offersData
  });



  comercios.push(req.body);

  res.status(201).send('Nuevo comercio agregado exitosamente');
};

// Actualizar un comercio por ID
exports.updateCommerce = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  let comercioIndex = comercios.findIndex(com => com.id === id);
  if (comercioIndex !== -1) {
      comercios[comercioIndex] = { ...comercios[comercioIndex], ...updatedData };
      res.json(comercios[comercioIndex]);
  } else {
      res.status(404).send('Comercio no encontrado');
  }
};

// Eliminar un comercio por ID
exports.deleteCommerce = (req, res) => {
  const id = parseInt(req.params.id);

  const comercioIndex = comercios.findIndex(com => com.id === id);
  if (comercioIndex !== -1) {
      comercios.splice(comercioIndex, 1);
      res.status(204).send();
  } else {
      res.status(404).send('Comercio no encontrado');
  }
};

//Obtenemos los datos del comercio y los guardamos en una variable
let comercios = require('../data/comercios.json');
const router = require('../routes/comercios');
