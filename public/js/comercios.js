// Función para leer el archivo JSON
async function fetchData() {
    try {
        const response = await fetch('/comercios/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error; // Lanza el error para manejarlo en la función que llama a fetchData
    }
}

// Función para obtener la categoría del comercio
async function getCommerceCategory(commerce) {
    try {
        const response = await fetch(`/comercios/getCategoriesByCommerce/${commerce}`);
        const data = await response.json();
        return data.length > 0 ? data[0].nombre : 'sin categoria';
    } catch (error) {
        console.error('Error al obtener la categoría del comercio:', error);
        return 'Sin categoria';
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
async function generateCommerceCard(commerce) {
    try {
        const categoria = await getCommerceCategory(commerce.id);

        // Generamos la estructura HTML de la tarjeta
        return `
            <a href="./comercio/?slug=${commerce.slug}" class="card" role="article">
                <header class="card__header">
                    <img src="${commerce.img_header}" alt="${commerce.alt_header}" class="card__image">
                    <p class="card__category"><span class="badge">${categoria}</span></p>
                </header>
                <div class="card__body">
                    <h3 class="card__title">${commerce.nombre}</h3>
                    <div class="card__description">${commerce.descripcion}</div>
                </div>
                <footer class="card__footer">
                    <ul class="card__services">
                        ${commerce.accessibility ? commerce.accessibility.map(service => getAccessibilityIcon(service)).join('') : ''}
                        ${commerce.menu ? commerce.menu.map(service => getAccessibilityIcon(service)).join('') : ''}
                    </ul>
                </footer>
            </a>
        `;
    } catch (error) {
        console.error('Error al generar la tarjeta del comercio:', error);
        return ''; // Retorna un string vacío en caso de error
    }
}

// Función para generar y agregar las tarjetas al contenedor
async function generateCommerceCards() {
    try {
        const comerciosContainer = document.getElementById('comercios-container');
        const data = await fetchData(); // Llama a fetchData para obtener los datos
        console.log(data);
        if (data) {
            for (const commerce of data) {
                const cardHtml = await generateCommerceCard(commerce);
                comerciosContainer.innerHTML += cardHtml;
            }
        }
    } catch (error) {
        console.error('Error al generar las tarjetas de comercio:', error);
        // Manejar el error adecuadamente (por ejemplo, mostrar un mensaje al usuario)
    }
}

