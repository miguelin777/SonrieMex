/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

const info = [
  {
    name: "Sonríe Mx",
    description: "Somos una red de jóvenes, comprometidos con mejorar el medio ambiente y nuestra comunidad. Nos enfocamos en formar agentes de cambio que inspiren y lideren iniciativas para crear un futuro mejor y más sostenible.",
    button1: "ÚNETE A LA CAUSA",
    button2: "VER IMPACTO",
    link1: "#projects", // Enlace para el primer botón
    link2: "#projects" // Enlace para el segundo botón
  },
  {
    name: "Ayuda a otros",
    description: "Inspira a otros con actos de bondad. Juntos podemos hacer un cambio significativo en nuestra sociedad, creando un futuro más justo y sostenible con el esfuerzo colectivo.",
    button1: "ACTÚA AHORA",
    button2: "VE LAS INICIATIVAS",
    link1: "#projects",
    link2: "#projects"
  },
  {
    name: "Cambia el mundo",
    description: "Un pequeño acto puede generar un gran impacto. Sé el cambio que quieres ver en el mundo, apoyando a quienes más lo necesitan y siempre impulsando el progreso.",
    button1: "INICIA EL CAMBIO",
    button2: "APRENDE MÁS",
    link1: "#projects",
    link2: "#projects"
  },
  {
    name: "Únete al cambio",
    description: "Juntos podemos lograr un futuro más justo y sostenible. ¡Únete a nuestra causa y contribuye a mejorar la vida de millones de personas en todo el mundo!",
    button1: "NOSOTROS",
    button2: "VER PROYECTOS",
    link1: "#projects",
    link2: "#projects"
  }
];

let index = 0;

function changeContent() {
  document.getElementById("homeName").textContent = info[index].name;
  document.getElementById("homeDescription").innerHTML = `<b>${info[index].name}</b>, ${info[index].description}`;

  // Cambiar texto de los botones y poner en mayúsculas
  const button1 = document.getElementById("homeButton1");
  const button2 = document.getElementById("homeButton2");

  button1.textContent = info[index].button1.toUpperCase();
  button2.textContent = info[index].button2.toUpperCase();

  // Actualizar los enlaces de los botones
  button1.setAttribute("href", info[index].link1);
  button2.setAttribute("href", info[index].link2);

  index = (index + 1) % info.length; // Reinicia el ciclo al llegar al último elemento
}

// Cambia el contenido cada 3 segundos
setInterval(changeContent, 7013);




/*===== MENU SHOW =====*/
/*Validar si existe constante */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/*Validar si existe constante */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");
const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // Al hacer clic en cada enlace de navegación, elimina la clase show-menu
  navMenu.classList.remove("show-menu");
};
navLink.forEach((link) => link.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  // Cuando el scroll es mayor a 50, añade la clase shadow-header
  window.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);


// Función para agregar la clase "scroll-header" cuando se hace scroll
// Función para agregar la clase "scroll-header" cuando se hace scroll
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

// Evento que ejecuta la función al hacer scroll
window.addEventListener('scroll', scrollHeader);
// Selecciona los enlaces del menú de navegación
const navLinks = document.querySelectorAll('.nav__link');

// Función para cambiar el color del menú cuando se está en la sección #about
function changeNavColor() {
  const aboutSection = document.getElementById('about'); // Sección que queremos detectar
  const aboutPosition = aboutSection.getBoundingClientRect(); // Posición de la sección #about
  
  // Cambia el color si el usuario está viendo la sección #about
  if (aboutPosition.top <= 50 && aboutPosition.bottom >= 50) {
    navLinks.forEach(link => link.classList.add('dark')); // Añade la clase .dark para cambiar el color a negro
  } else {
    navLinks.forEach(link => link.classList.remove('dark')); // Remueve la clase .dark para restaurar el color original
  }
}

// Ejecuta la función al hacer scroll
window.addEventListener('scroll', changeNavColor);




/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // Cuando el scroll sea mayor que 350, mostrar el botón de scroll up
  window.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};

window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTION ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Set inicial del tema a light
document.body.classList.remove(darkTheme);
themeButton.classList.remove(iconTheme);
localStorage.setItem("selected-theme", "light");
localStorage.setItem("selected-icon", "ri-moon-line");

// Obtener tema actual
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// Activar / desactivar el tema con el botón
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true, // Animaciones se repiten
});

sr.reveal(`.home__perfil, .about__image, .contact__mail`, { origin: "right" });
sr.reveal(
  `.home__name, .home__info, 
  .about__container .section__title-1, .about__info, 
  .contact__social, .contact__data`,
  { origin: "left" }
);
sr.reveal(`.services__card, .projects__card`, { interval: 100 });


/*=============== CHANGE THEME ON SCROLL TO PROJECTS SECTION ===============*/
const projectsSection = document.getElementById("projects");
let themeChanged = false; // Controla si el tema ha sido cambiado al desplazarse

const changeThemeOnScroll = () => {
  const scrollDown = window.scrollY;
  const projectsTop = projectsSection.offsetTop - 58; 
  const projectsBottom = projectsTop + projectsSection.offsetHeight;

  // Si el scroll está en la sección de proyectos
  if (scrollDown >= projectsTop && scrollDown < projectsBottom) {
    if (!themeChanged) {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      themeChanged = true;
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    }
  } else {
    if (themeChanged) {
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      themeChanged = false;
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    }
  }
};

window.addEventListener("scroll", changeThemeOnScroll);

// Set tema basado en localStorage
const savedTheme = localStorage.getItem("selected-theme");
const savedIcon = localStorage.getItem("selected-icon");

if (savedTheme) {
  document.body.classList.toggle(darkTheme, savedTheme === "dark");
  themeButton.classList.toggle(iconTheme, savedIcon === "ri-sun-line");
}

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section-one, .section-two, .section-three, .section-four");
  const finalSection = document.querySelector("#final-section"); // Suponiendo que esta es la última sección visible

  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  // Cuando la última sección (quinta o final) es visible, removemos sticky de todas las secciones
                  sections.forEach((section) => {
                      section.classList.add("no-sticky");
                  });
              } else {
                  // Si la última sección ya no es visible (al retroceder hacia arriba), restauramos sticky
                  sections.forEach((section) => {
                      section.classList.remove("no-sticky");
                  });
              }
          });
      },
      {
          root: null,
          threshold: 0.1, // Detectar cuando el 10% de la última sección esté visible
      }
  );

  observer.observe(finalSection);
});


document.addEventListener("DOMContentLoaded", function () {
  const imgElement = document.getElementById("switchable-image"); // Selecciona la imagen
  const image1 = "./assets/img/1png-removebg-preview.png"; // Primer imagen
  const image2 = "./assets/img/2png-removebg-preview.png"; // Segunda imagen
  let isImage1 = true;

  // Cambia la imagen cada 2 segundos (2000ms)
  setInterval(() => {
      if (isImage1) {
          imgElement.src = image2; // Cambia a la segunda imagen
      } else {
          imgElement.src = image1; // Cambia de vuelta a la primera imagen
      }
      isImage1 = !isImage1; // Alterna entre las dos imágenes
  }, 300); // Intervalo de 2 segundos
});

document.querySelectorAll('.social-benefit__button').forEach(button => {
  button.addEventListener('click', function() {
    const imageWrapper = this.parentElement;
    const image = imageWrapper.querySelector('.social-benefit__image');
    const text = imageWrapper.querySelector('.social-benefit__text');

    // Verifica si el texto está oculto y desplázalo suavemente hacia abajo
    if (text.style.opacity === '0' || text.style.opacity === '') {
      text.style.opacity = '1';
      text.style.transform = 'translateY(0)'; // Desplazamos el texto suavemente hacia abajo
      image.style.opacity = '0'; // Ocultamos la imagen
      this.textContent = 'Volver'; // Cambiamos el texto del botón a "Volver"
    } else {
      text.style.opacity = '0';
      text.style.transform = 'translateY(-100%)'; // Retornamos el texto a la parte superior
      image.style.opacity = '1'; // Mostramos de nuevo la imagen
      this.textContent = 'Descubre más'; // Cambiamos de nuevo el texto a "Descubre más"
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const stickySections = document.querySelectorAll('.section-one, .section-two, .section-three');
  const sectionFour = document.querySelector('.section-four'); // Seleccionamos la sección 4
  const stickyWrapper = document.querySelector('.sticky-wrapper'); // El wrapper que envuelve las secciones
  
  let isStickyDisabled = true; // Bandera para controlar el estado sticky
  const threshold = 50; // Umbral para suavizar la transición

  // Función que ajusta el sticky al cargar la página, dependiendo de la posición actual del scroll
  function initializeSticky() {
    const sectionFourOffset = sectionFour.getBoundingClientRect().top + window.scrollY;
    const scrollPosition = window.scrollY;

    // Verificamos la posición del scroll al cargar la página
    if (scrollPosition >= (sectionFourOffset - threshold)) {
      // Si ya estamos más allá del umbral, desactivamos el sticky de inmediato
      stickySections.forEach((section) => {
        section.style.position = 'relative';
      });
      isStickyDisabled = true;
    }
  }

  // Función que detecta el scroll
  function handleScroll() {
    const sectionFourOffset = sectionFour.getBoundingClientRect().top + window.scrollY; // Posición actual de la sección 4
    const scrollPosition = window.scrollY;

    // Si el scroll está cerca de la sección 4, pero antes de alcanzarla completamente
    if (scrollPosition >= (sectionFourOffset - threshold)) {
      if (!isStickyDisabled) {
        // Desactivar sticky y mantener las secciones en su lugar
        stickySections.forEach((section) => {
          section.style.position = 'relative'; // Fijar la posición como relativa
        });
        isStickyDisabled = true; // Desactivar más cambios de sticky
      }
    } else {
      if (isStickyDisabled) {
        // Restaurar sticky si el usuario ha subido
        stickySections.forEach((section) => {
          section.style.position = 'sticky'; // Restaurar sticky en secciones anteriores
          section.style.top = '0'; // Resetear la posición
        });
        isStickyDisabled = false; // Permitir cambios nuevamente
      }
    }
  }

  // Ejecutamos la inicialización cuando la página carga para verificar la posición actual
  initializeSticky();

  // Detectamos el evento de scroll
  window.addEventListener('scroll', handleScroll);
});

