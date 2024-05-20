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
    return icons[service] || false;
}

// Función para generar la estructura HTML para cada car del comercio
function generateCommerceCard(commerce) {
    return `
        <a href="./comercios/index.html?slug=${commerce.slug}" class="card" role="article">
            <header class="card__header">
                <img src="./assets/img/${commerce.headerImage}" alt="${commerce.headerImageAltText}" class="card__image">
                <p class="card__category">${commerce.category}</p>
            </header>
            <div class="card__body">
                <h3 class="card__title">${commerce.name}</h3>
                <p class="card__description">${commerce.description}</p>
            </div>
            <footer class="card__footer">
                <ul class="card__services">
                    ${commerce.accessibility.map(service => `<li class="card__service"><span class="mdi ${getAccessibilityIcon(service)}"></span></li>`).join('')}
                    ${commerce.menu.map(service => `<li class="card__service"><span class="mdi ${getAccessibilityIcon(service)}"></span></li>`).join('')}
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

