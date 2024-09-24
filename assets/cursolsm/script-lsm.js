
// Seleccionar los enlaces de video y el reproductor de video
const videoLinks = document.querySelectorAll('.row');
const videoPlayer = document.getElementById('course-video-player');
const quizSection = document.getElementById('quiz-section'); // Sección de quiz
const contentContainer = document.getElementById('content-container'); // Contenedor de video/quiz
const practiceLink = document.getElementById('practice-link'); // Enlace a la práctica

// Variable para almacenar el contenido original del video
let originalVideoContent = contentContainer.innerHTML;

// Función para actualizar el video
videoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del enlace
    const videoURL = link.getAttribute('data-video'); // Obtener la URL del video

    // Restaurar el contenido original del contenedor y actualizar el src del video
    contentContainer.innerHTML = originalVideoContent;
    const newVideoPlayer = document.getElementById('course-video-player'); // Reobtener el nuevo iframe
    newVideoPlayer.src = videoURL; // Actualizar el src del iframe con el nuevo video

    // Asegurarse de que el quiz no esté visible
    quizSection.style.display = 'none';

    // Desplazar hacia abajo hasta el video
    contentContainer.scrollIntoView({ behavior: 'smooth' });
  });
});

// Datos de las imágenes y letras para el abecedario (quiz)
const images = [
  { letter: "A", imgSrc: "./../img/a.jpg" },
  { letter: "B", imgSrc: "./../img/b.jpg" },
  { letter: "C", imgSrc: "./../img/c.jpg" },
  { letter: "D", imgSrc: "./../img/d.jpg" },
  { letter: "E", imgSrc: "./../img/e.jpg" },
  { letter: "F", imgSrc: "./../img/f.jpg" },
  { letter: "G", imgSrc: "./../img/g.jpg" },
  { letter: "H", imgSrc: "./../img/h.jpg" },
  { letter: "I", imgSrc: "./../img/i.jpg" },
  { letter: "J", imgSrc: "./../img/j.jpg" },
  { letter: "K", imgSrc: "./../img/k.jpg" },
  { letter: "L", imgSrc: "./../img/l.jpg" },
  { letter: "M", imgSrc: "./../img/m.jpg" },
  { letter: "N", imgSrc: "./../img/n.jpg" },
  { letter: "O", imgSrc: "./../img/o.jpg" },
  { letter: "P", imgSrc: "./../img/p.jpg" },
  { letter: "Q", imgSrc: "./../img/q.jpg" },
  { letter: "R", imgSrc: "./../img/r.jpg" },
  { letter: "S", imgSrc: "./../img/s.jpg" },
  { letter: "T", imgSrc: "./../img/t.jpg" },
  { letter: "U", imgSrc: "./../img/u.jpg" },
  { letter: "V", imgSrc: "./../img/v.jpg" },
  { letter: "W", imgSrc: "./../img/w.jpg" },
  { letter: "X", imgSrc: "./../img/x.jpg" },
  { letter: "Y", imgSrc: "./../img/y.jpg" },
  { letter: "Z", imgSrc: "./../img/z.jpg" }
];

let currentQuestion = 0; // Mantener la pregunta actual
let attempts = 0; // Contador de intentos

// Elementos del quiz
const lsmImage = document.getElementById('lsm-image');
const quizInput = document.getElementById('quiz-input');
const quizResult = document.getElementById('quiz-result');
const nextButton = document.getElementById('next-button');

// Mostrar el quiz cuando se hace clic en el enlace de práctica
practiceLink.addEventListener('click', (e) => {
  e.preventDefault();

  // Ocultar el video y mostrar la práctica
  contentContainer.innerHTML = ''; // Limpiar el contenido
  contentContainer.appendChild(quizSection); // Insertar el quiz en el contenedor
  quizSection.style.display = 'block'; // Mostrar la sección del quiz
  
  loadQuestion(); // Cargar la primera pregunta del quiz

  // Desplazar hacia abajo hasta la sección del quiz
  quizSection.scrollIntoView({ behavior: 'smooth' });
});

// Cargar la pregunta actual en el quiz
function loadQuestion() {
  lsmImage.src = images[currentQuestion].imgSrc; // Mostrar la imagen correspondiente a la letra
  quizResult.textContent = ''; // Limpiar los resultados previos
  quizInput.value = ''; // Limpiar el campo de entrada
  nextButton.style.display = 'none'; // Ocultar el botón de siguiente
  attempts = 0; // Reiniciar los intentos
}

// Verificar la respuesta ingresada
quizInput.addEventListener('input', () => {
  const enteredLetter = quizInput.value.toUpperCase(); // Convertir a mayúscula para comparar
  const correctLetter = images[currentQuestion].letter;

  if (enteredLetter.length === 0) {
    quizResult.textContent = ''; // Si está vacío, no hacer nada
    return;
  }

  if (enteredLetter === correctLetter) {
    quizResult.textContent = '¡Correcto!';
    quizResult.style.color = 'green';
    nextButton.style.display = 'block'; // Mostrar el botón de siguiente si es correcto
  } else {
    attempts += 1; // Incrementar los intentos
    if (attempts >= 3) {
      quizResult.textContent = `Incorrecto. La letra correcta es ${correctLetter}.`;
      quizResult.style.color = 'blue';
      nextButton.style.display = 'block'; // Mostrar el botón de siguiente después de 3 intentos
    } else {
      quizResult.textContent = `Incorrecto. Te quedan ${3 - attempts} intentos.`;
      quizResult.style.color = 'red';
    }
  }
});

// Pasar a la siguiente letra cuando se hace clic en el botón de siguiente
nextButton.addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % images.length; // Avanzar a la siguiente letra
  loadQuestion(); // Cargar la nueva pregunta
});
window.onload = function() {
  const video = document.querySelector('.course-intro__video iframe');
  if (window.innerWidth < 768) {
      video.style.height = '170px';
  }
};


// Ocultar la sección de quiz inicialmente
quizSection.style.display = 'none';

