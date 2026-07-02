/* ═══════════════════════════════════════════════════════════════
   SONRÍE MÉXICO — main.js
   Comportamiento de la parte CONSERVADA (header, hero con video,
   secciones sticky) + utilidades globales. El rediseño de abajo
   vive en animaciones.js (GSAP + Lenis).
   ═══════════════════════════════════════════════════════════════ */
"use strict";

/*=============== MENÚ MÓVIL ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    document.body.classList.add("menu-open");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    document.body.classList.remove("menu-open");
  });
}

document.querySelectorAll(".nav__link").forEach((link) =>
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    document.body.classList.remove("menu-open");
  })
);

/*=============== ROTADOR DE TEXTO DEL HERO (con fundido suave) ===============*/
const heroInfo = [
  {
    name: "Sonríe Mx",
    description: "Somos una red de jóvenes, comprometidos con mejorar el medio ambiente y nuestra comunidad. Nos enfocamos en formar agentes de cambio que inspiren y lideren iniciativas para crear un futuro mejor y más sostenible.",
    button1: "ÚNETE A LA CAUSA",
    button2: "VER IMPACTO",
    link1: "#about",
    link2: "#projects"
  },
  {
    name: "Ayuda a otros",
    description: "Inspira a otros con actos de bondad. Juntos podemos hacer un cambio significativo en nuestra sociedad, creando un futuro más justo y sostenible con el esfuerzo colectivo.",
    button1: "ACTÚA AHORA",
    button2: "VE LAS INICIATIVAS",
    link1: "https://chat.whatsapp.com/EVDJWwduoSY5h7GKEu5VW6",
    link2: "#projects"
  },
  {
    name: "Cambia el mundo",
    description: "Un pequeño acto puede generar un gran impacto. Sé el cambio que quieres ver en el mundo, apoyando a quienes más lo necesitan y siempre impulsando el progreso.",
    button1: "INICIA EL CAMBIO",
    button2: "APRENDE MÁS",
    link1: "https://chat.whatsapp.com/EVDJWwduoSY5h7GKEu5VW6",
    link2: "#mex"
  },
  {
    name: "Únete al cambio",
    description: "Juntos podemos lograr un futuro más justo y sostenible. ¡Únete a nuestra causa y contribuye a mejorar la vida de millones de personas en todo el mundo!",
    button1: "NOSOTROS",
    button2: "VER PROYECTOS",
    link1: "https://www.instagram.com/sonrie_mexico/",
    link2: "#projects"
  }
];

let heroIndex = 0;
const homeName = document.getElementById("homeName");
/* solo el texto visible rota; el descriptor geo oculto del H1 se conserva */
const homeNameText = document.getElementById("homeNameText") || homeName;
const homeDescription = document.getElementById("homeDescription");
const homeButton1 = document.getElementById("homeButton1");
const homeButton2 = document.getElementById("homeButton2");

function cambiarHero() {
  if (!homeName || !homeDescription || !homeButton1 || !homeButton2) return;
  const partes = [homeName, homeDescription, homeButton1.parentElement];
  partes.forEach((el) => el.classList.add("sm-fade-out"));

  setTimeout(() => {
    const item = heroInfo[heroIndex];
    homeNameText.textContent = item.name;
    homeDescription.innerHTML = "<b>" + item.name + "</b>, " + item.description;
    homeButton1.textContent = item.button1.toUpperCase();
    homeButton2.textContent = item.button2.toUpperCase();
    homeButton1.setAttribute("href", item.link1);
    homeButton2.setAttribute("href", item.link2);
    heroIndex = (heroIndex + 1) % heroInfo.length;
    partes.forEach((el) => el.classList.remove("sm-fade-out"));
  }, 420);
}

setInterval(cambiarHero, 14003);

/*=============== IMAGEN ALTERNANTE (sección sticky 1) ===============*/
const switchableImage = document.getElementById("switchable-image");

if (switchableImage) {
  const frame1 = "./assets/img/1png-removebg-preview.png";
  const frame2 = "./assets/img/2png-removebg-preview.png";
  [frame1, frame2].forEach((src) => { const im = new Image(); im.src = src; });

  let mostrandoFrame1 = true;
  setInterval(() => {
    switchableImage.src = mostrandoFrame1 ? frame2 : frame1;
    mostrandoFrame1 = !mostrandoFrame1;
  }, 300);
}

/*=============== SECCIONES STICKY (misma conducta de siempre) ===============*/
const stickySections = document.querySelectorAll(".section-one, .section-two, .section-three");
const todasSticky = document.querySelectorAll(".section-one, .section-two, .section-three, .section-four");
const sectionFour = document.querySelector(".section-four");
let stickyDesactivado = false;
const STICKY_UMBRAL = 50;

function ajustarSticky() {
  if (!sectionFour) return;
  const offsetCuatro = sectionFour.getBoundingClientRect().top + window.scrollY;
  const pos = window.scrollY;

  if (pos >= offsetCuatro - STICKY_UMBRAL) {
    if (!stickyDesactivado) {
      stickySections.forEach((s) => { s.style.position = "relative"; });
      stickyDesactivado = true;
    }
  } else if (stickyDesactivado) {
    stickySections.forEach((s) => { s.style.position = "sticky"; s.style.top = "0"; });
    stickyDesactivado = false;
  }
}

if (sectionFour && "IntersectionObserver" in window) {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        todasSticky.forEach((s) => s.classList.toggle("no-sticky", entry.isIntersecting));
      });
    },
    { threshold: 0.1 }
  ).observe(sectionFour);
}

/*=============== UN SOLO LISTENER DE SCROLL (pasivo) ===============*/
const header = document.getElementById("header");
const scrollUpBtn = document.getElementById("scroll-up");
const seccionesConId = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav__link");
const themeButton = document.getElementById("theme-button");
const zonaNueva = document.getElementById("zona-nueva");

function alScroll() {
  const y = window.scrollY;

  if (header) {
    header.classList.toggle("shadow-header", y >= 50);
    header.classList.toggle("scroll-header", y >= 50);
  }

  if (scrollUpBtn) scrollUpBtn.classList.toggle("show-scroll", y >= 350);

  /* enlace activo del menú (con guardas) */
  seccionesConId.forEach((seccion) => {
    const alto = seccion.offsetHeight;
    const top = seccion.getBoundingClientRect().top + y - 90;
    const id = seccion.getAttribute("id");
    const enlace = document.querySelector('.nav__menu a[href*="' + id + '"]');
    if (!enlace) return;
    enlace.classList.toggle("active-link", y > top && y <= top + alto);
  });

  /* enlaces oscuros cuando el header pisa la zona papel (solo escritorio) */
  if (zonaNueva && window.innerWidth >= 1150) {
    const dentroDeNoche = enZonaNoche(y + 40);
    const enZonaClara = y + 70 >= zonaNueva.getBoundingClientRect().top + y && !dentroDeNoche;
    navLinks.forEach((l) => l.classList.toggle("dark", enZonaClara));
    if (themeButton) themeButton.classList.toggle("dark", enZonaClara);
  }

  ajustarSticky();
}

/* ¿el borde superior de la pantalla está sobre una sección noche? */
const seccionesNoche = document.querySelectorAll(".sm-stats, .sm-video, .sm-footer");
function enZonaNoche(puntoY) {
  for (const s of seccionesNoche) {
    const r = s.getBoundingClientRect();
    const top = r.top + window.scrollY;
    if (puntoY >= top && puntoY <= top + r.height) return true;
  }
  return false;
}

window.addEventListener("scroll", alScroll, { passive: true });
ajustarSticky();

/*=============== TEMA CLARO / OSCURO (solo parte conservada) ===============*/
const TEMA_OSCURO = "dark-theme";
const ICONO_TEMA = "ri-sun-line";

const temaGuardado = localStorage.getItem("selected-theme");
if (temaGuardado === "dark") {
  document.body.classList.add(TEMA_OSCURO);
  if (themeButton) themeButton.classList.add(ICONO_TEMA);
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle(TEMA_OSCURO);
    themeButton.classList.toggle(ICONO_TEMA);
    localStorage.setItem(
      "selected-theme",
      document.body.classList.contains(TEMA_OSCURO) ? "dark" : "light"
    );
    alScroll();
  });
}

/*=============== SCROLLREVEAL (solo el hero, como siempre) ===============*/
window.addEventListener("load", () => {
  if (typeof ScrollReveal === "undefined") return;
  const sr = ScrollReveal({ origin: "top", distance: "60px", duration: 2500, delay: 400 });
  sr.reveal(".home__perfil", { origin: "right" });
  sr.reveal(".home__name, .home__info", { origin: "left" });
});

/*=============== AÑO DEL FOOTER ===============*/
const anioFooter = document.getElementById("anioFooter");
if (anioFooter) anioFooter.textContent = new Date().getFullYear();
