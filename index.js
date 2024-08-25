/*
  fetch('https://thronesapi.com/api/v2/Characters')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
*/

let datosPersonajes = [];

async function obtenerPersonajes() {
    try {
        const respuesta = await fetch('https://thronesapi.com/api/v2/Characters');
        if (!respuesta.ok) {
            throw new Error('La respuesta de la red no fue correcta ' + respuesta.statusText);
        }
        const datos = await respuesta.json();
        datosPersonajes = datos;
        llenarSelect(datos);
    } catch (error) {
        console.error('Ha habido un problema con tu operación de fetch:', error);
    }
}

function llenarSelect(personajes) {
    const select = document.getElementById('character-list');
    
    // Agregar opción vacía
    const opcionVacia = document.createElement('option');
    opcionVacia.value = "";
    opcionVacia.disabled = true;
    opcionVacia.selected = true;
    opcionVacia.textContent = "Seleccione una opción";
    select.appendChild(opcionVacia);

    personajes.forEach(personaje => {
        const opcion = document.createElement('option');
        opcion.value = personaje.id;
        opcion.textContent = personaje.fullName;
        select.appendChild(opcion);
    });
}

function mostrarImagenPersonaje() {
    const select = document.getElementById('character-list');
    const idSeleccionado = select.value;
    const personaje = datosPersonajes.find(char => char.id == idSeleccionado);
    if (personaje) {
        const img = document.getElementById('character-image');
        img.src = personaje.imageUrl;
        
        const nombre = document.getElementById('character-name');
        nombre.textContent = personaje.fullName;

        const titulo = document.getElementById('character-title');
        titulo.textContent = personaje.title;

        const familia = document.getElementById('character-family');
        familia.textContent = personaje.family;
 
    }
}

document.getElementById('character-list').addEventListener('change', mostrarImagenPersonaje);

// Llamar a la función para hacer la petición al cargar la página
obtenerPersonajes();