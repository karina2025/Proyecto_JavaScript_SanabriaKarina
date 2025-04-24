const razaSelect = document.getElementById("razaSelect");
const claseSelect = document.getElementById("claseSelect");
const detalleRaza = document.getElementById("detalleRaza");
const detalleClase = document.getElementById("detalleClase");
const formulario = document.getElementById("personajeForm");
const resultado = document.getElementById("resultado");

let personaje = {};

// Cargar razas desde la API
fetch("https://www.dnd5eapi.co/api/races")
  .then(res => res.json())
  .then(data => {
    data.results.forEach(raza => {
      const option = document.createElement("option");
      option.value = raza.index;
      option.textContent = raza.name;
      razaSelect.appendChild(option);
    });
  });

// Cargar clases desde la API
fetch("https://www.dnd5eapi.co/api/classes")
  .then(res => res.json())
  .then(data => {
    data.results.forEach(clase => {
      const option = document.createElement("option");
      option.value = clase.index;
      option.textContent = clase.name;
      claseSelect.appendChild(option);
    });
  });

// Mostrar detalles al seleccionar raza
razaSelect.addEventListener("change", () => {
  const razaId = razaSelect.value;
  if (razaId) {
    fetch(`https://www.dnd5eapi.co/api/races/${razaId}`)
      .then(res => res.json())
      .then(data => {
        detalleRaza.textContent = `
          ${data.name}: ${data.alignment}. Tamaño: ${data.size}. Velocidad: ${data.speed.walk} pies.
        `;
      });
  } else {
    detalleRaza.textContent = "Selecciona una raza para ver detalles.";
  }
});

// Mostrar detalles al seleccionar clase
claseSelect.addEventListener("change", () => {
  const claseId = claseSelect.value;
  if (claseId) {
    fetch(`https://www.dnd5eapi.co/api/classes/${claseId}`)
      .then(res => res.json())
      .then(data => {
        detalleClase.textContent = `
          ${data.name}: Dado de golpe: d${data.hit_die}.
        `;
      });
  } else {
    detalleClase.textContent = "Selecciona una clase para ver detalles.";
  }
});

// Guardar personaje
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = new FormData(formulario);
  personaje = Object.fromEntries(datos.entries());

  // Guardar en localStorage
  localStorage.setItem("personajeGuardado", JSON.stringify(personaje));

  mostrarPersonaje(personaje);
});

function mostrarPersonaje(personaje) {
  resultado.innerHTML = `
    <h3>Personaje Guardado</h3>
    <p><strong>Nombre:</strong> ${personaje.nombre}</p>
    <p><strong>Raza:</strong> ${personaje.raza}</p>
    <p><strong>Clase:</strong> ${personaje.clase}</p>
    <p><strong>Género:</strong> ${personaje.genero}</p>
    <p><strong>Fuerza:</strong> ${personaje.fuerza}</p>
    <p><strong>Destreza:</strong> ${personaje.destreza}</p>
    <p><strong>Inteligencia:</strong> ${personaje.inteligencia}</p>
    <p><strong>Armadura:</strong> ${personaje.armadura}</p>
    <p><strong>Arma:</strong> ${personaje.arma}</p>
    <p><strong>Habilidades:</strong> ${personaje.habilidades}</p>
    <p><strong>Accesorios:</strong> ${personaje.accesorios}</p>
    <button onclick="borrarPersonaje()">Borrar Personaje</button>
  `;
}

// Al cargar la página, mostrar personaje si ya hay uno en localStorage
document.addEventListener("DOMContentLoaded", () => {
  const personajeGuardado = localStorage.getItem("personajeGuardado");
  if (personajeGuardado) {
    mostrarPersonaje(JSON.parse(personajeGuardado));
  }
});

// Borrar personaje del localStorage
function borrarPersonaje() {
  localStorage.removeItem("personajeGuardado");
  resultado.innerHTML = "<p>Personaje eliminado.</p>";
}
