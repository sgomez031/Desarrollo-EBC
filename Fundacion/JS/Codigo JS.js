// Mostrar año actual en el footer
document.querySelector('#year').textContent = new Date().getFullYear();

// Endpoints de prueba
const ENDPOINT_NEWS = "https://jsonplaceholder.typicode.com/posts?_limit=3";
const ENDPOINT_VOLUNTEERS = "https://randomuser.me/api/?results=4&nat=us,es,gb";

// Crear tarjeta de noticia
function renderNewsCard(post) {
  const card = document.createElement("div");
  card.className = "card news-item fade-in";

  const img = document.createElement("img");
  img.src = `https://picsum.photos/seed/vida${post.id}/200/140`;
  img.alt = "Imagen noticia";

  const content = document.createElement("div");
  const title = document.createElement("h4");
  title.textContent = post.title;
  title.className = "news-title";

  const excerpt = document.createElement("p");
  excerpt.textContent = post.body.slice(0, 120) + (post.body.length > 120 ? "…" : "");
  excerpt.className = "news-excerpt";

  content.appendChild(title);
  content.appendChild(excerpt);

  card.appendChild(img);
  card.appendChild(content);
  return card;
}

// Crear tarjeta de voluntario
function renderVolunteerCard(user) {
  const card = document.createElement("div");
  card.className = "vol fade-in";

  const avatar = document.createElement("img");
  avatar.src = user.picture.medium;
  avatar.alt = `${user.name.first} ${user.name.last}`;
  avatar.className = "avatar";

  const info = document.createElement("div");
  const name = document.createElement("div");
  name.textContent = `${user.name.first} ${user.name.last}`;
  name.className = "vol-name";

  const city = document.createElement("div");
  city.textContent = `${user.location.city}, ${user.nat}`;
  city.className = "vol-meta";

  info.appendChild(name);
  info.appendChild(city);

  card.appendChild(avatar);
  card.appendChild(info);

  return card;
}

// Cargar noticias con async/await
async function loadNews() {
  const container = document.getElementById("news");
  container.innerHTML = "<div class='card'>Cargando noticias...</div>";
  try {
    const res = await fetch(ENDPOINT_NEWS);
    const data = await res.json();
    container.innerHTML = "";
    data.forEach(post => container.appendChild(renderNewsCard(post)));
  } catch (error) {
    console.error("Error al traer noticias:", error);
    container.innerHTML = "<div class='card'>No fue posible cargar las noticias en este momento.</div>";
  }
}

// Cargar voluntarios con async/await
async function loadVolunteers() {
  const container = document.getElementById("vols");
  container.innerHTML = "<div class='card'>Cargando perfiles...</div>";
  try {
    const res = await fetch(ENDPOINT_VOLUNTEERS);
    const data = await res.json();
    container.innerHTML = "";
    (data.results || []).forEach(user => container.appendChild(renderVolunteerCard(user)));
  } catch (error) {
    console.error("Error al traer voluntarios:", error);
    container.innerHTML = "<div class='card'>No fue posible mostrar los perfiles.</div>";
  }
}

// Evento formulario de contacto (demo)
document.querySelector("#contact-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("🙏 Gracias por tu mensaje. La Fundación Vida Libre lo ha registrado (demo).");
  e.target.reset();
});

// Ejecutar funciones al cargar
loadNews();
loadVolunteers();
