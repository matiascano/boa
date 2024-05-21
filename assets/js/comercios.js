// Función para leer el archivo JSON
async function fetchData() {
    try {
        const response = await fetch('./assets/data/comercios.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
    }
}

// Función para obtener el icono de accesibilidad y menúes correspondiente
function getAccessibilityIcon(service) {
    const icons = {
        "braille": "mdi-braille",
        "sign language": "mdi-sign-language",
        "dog friendly": "mdi-dog",
        "dog service" : "mdi-dog-service",
        "wheelchair accessible": "mdi-wheelchair",
        "diabetic": "medical_services",
        "gluten free": "mdi-barley-off" , 
        "vegan": "mdi-sprout", 
        "diabetic" : "mdi-diabetes" 
    };
    if (icons[service]){
        return `<li class="card__service"><span class="mdi ${icons[service]}"></span></li>` || false;
    }
}

// Función para generar la estructura HTML para cada card del comercio
function generateCommerceCard(commerce) {
    return `
        <a href="./comercios/index.html?slug=${commerce.slug}" class="card" role="article">
            <header class="card__header">
                <img src="./assets/img/${commerce.headerImage}" alt="${commerce.headerImageAltText}" class="card__image">
                <p class="card__category">${commerce.category}</p>
            </header>
            <div class="card__body">
                <h3 class="card__title">${commerce.name}</h3>
                <div class="card__description">${commerce.description}</div>
            </div>
            <footer class="card__footer">
                <ul class="card__services">
                    ${commerce.accessibility.map(service => getAccessibilityIcon(service)).join('')}
                    ${commerce.menu.map(service => getAccessibilityIcon(service)).join('')}
                </ul>
            </footer>
        </a>
    `;
}

// Función principal para generar y agregar las tarjetas al contenedor
async function generateCommerceCards() {
    const comerciosContainer = document.getElementById('comercios-container');
    const data = await fetchData();
    if (data) {
        data.forEach(commerce => {
            comerciosContainer.innerHTML += generateCommerceCard(commerce);
        });
    }
}

// Función para generar la estructura HTML para cada card de los resultados
function generateResultsCard(commerce) {
    return `
    <a class="card-small" href="./comercios/index.html?slug=${commerce.slug}" role="article">
    <img src="./assets/img/${commerce.profileImage}" alt="${commerce.profileImageAltText}" class="card-small__image">
        <h3 class="card-small__title">${commerce.name}</h3>
        <p class="card-small__text">${commerce.category}</p>
            <footer class="card-small__footer">
                <ul class="lists">
                ${commerce.accessibility.map(service => getAccessibilityIcon(service)).join('')}
                ${commerce.menu.map(service => getAccessibilityIcon(service)).join('')}
                </ul>
            </footer>
    </a>`;
}

//Funcion principal para generar y agregar cards de resultados
async function generateResultsCards() {
    const comerciosContainer = document.getElementById('comercios-container');
    const data = await fetchData();
    if (data) {
        data.forEach(commerce => {
            comerciosContainer.innerHTML += generateResultsCard(commerce);
        });
    }
}

