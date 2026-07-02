/* ═══════════════════════════════════════════════════════════════
   SONRÍE MÉXICO — animaciones.js
   Motor del rediseño: GSAP 3 + ScrollTrigger + Lenis.
   Progresivo: sin CDN o con reduced-motion el sitio queda
   completo y legible (los estados ocultos solo se activan
   cuando este motor arranca: html.sm-anim).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var zona = document.getElementById("zona-nueva");
  if (!zona) return;

  /* Con reduced-motion: nada de motor, el CSS ya deja todo visible */
  if (!reduced) document.documentElement.classList.add("sm-anim");

  /* ══════════ GRANO DE PELÍCULA (solo en la zona nueva) ══════════ */
  if (!reduced) {
    var grano = document.createElement("div");
    grano.className = "sm-grano";
    grano.setAttribute("aria-hidden", "true");
    grano.appendChild(document.createElement("i"));
    zona.appendChild(grano);
  }

  /* ══════════ SMOOTH SCROLL (Lenis, solo puntero fino) ══════════ */
  var lenis = null;
  if (window.Lenis && !reduced && finePointer) {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    /* el scroll-behavior:smooth global de styles.css animaría cada
       escritura de Lenis; el CSS html.lenis ya lo apaga, esto es cinturón */
    document.documentElement.style.scrollBehavior = "auto";
    window.smLenis = lenis;
  }

  /* anclas suaves vía Lenis (sin Lenis, manda el smooth nativo del CSS) */
  if (lenis) {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href");
        if (href === "#") return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        if (history.pushState) history.pushState(null, "", href);
        lenis.scrollTo(target, { offset: -60, duration: 1.4 });
      });
    });
  }

  /* ══════════ CURSOR PERSONALIZADO ══════════ */
  var cursor = document.getElementById("cursor");
  var cursorText = document.getElementById("cursorText");
  if (finePointer && !reduced && cursor) {
    document.body.classList.add("has-cursor");

    var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    var visto = false, quieto = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!visto) { cx = mx; cy = my; visto = true; }
      cursor.classList.remove("-hidden");
    });
    document.documentElement.addEventListener("mouseleave", function () {
      cursor.classList.add("-hidden");
    });

    gsap.ticker.add(function () {
      var dx = mx - cx, dy = my - cy;
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        if (!quieto) {
          cx = mx; cy = my; quieto = true;
          cursor.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
        }
        return;
      }
      quieto = false;
      cx += dx * 0.16;
      cy += dy * 0.16;
      var t = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      if (!cursor.classList.contains("-text")) {
        var vel = Math.hypot(dx, dy);
        var estira = Math.min(vel * 0.004, 0.26);
        var ang = Math.atan2(dy, dx) * 180 / Math.PI;
        t += " rotate(" + ang + "deg) scale(" + (1 + estira) + "," + (1 - estira) + ") rotate(" + (-ang) + "deg)";
      }
      cursor.style.transform = t;
    });

    document.addEventListener("mouseover", function (e) {
      var el = e.target;
      if (!(el instanceof Element)) return;
      var conTexto = el.closest("[data-cursor-text]");
      var clicable = el.closest("a, button, summary, [role='button']");
      var inverso = el.closest("[data-cursor='-inverse']");
      cursor.classList.toggle("-text", !!conTexto);
      cursorText.textContent = conTexto ? conTexto.getAttribute("data-cursor-text") : "";
      cursor.classList.toggle("-grow", !!clicable && !conTexto);
      cursor.classList.toggle("-inverse", !!inverso);
    });
  }

  /* ══════════ MAGNÉTICOS ══════════ */
  if (finePointer && !reduced) {
    document.querySelectorAll("[data-magnetic]").forEach(function (box) {
      var el = box.querySelector(".sm-btn") || box;
      box.addEventListener("mousemove", function (e) {
        var r = box.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.25,
          y: (e.clientY - (r.top + r.height / 2)) * 0.25,
          duration: 0.35, ease: "power2.out", overwrite: "auto"
        });
      });
      box.addEventListener("mouseleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1,0.4)" });
      });
    });
  }

  if (reduced) return; /* de aquí en adelante todo es motion */

  /* ══════════ SPLIT DE LÍNEAS ══════════ */
  function splitLines(el) {
    var texto = el.textContent.trim().replace(/\s+/g, " ");
    var palabras = texto.split(" ");
    el.innerHTML = palabras.map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
    var spans = Array.prototype.slice.call(el.querySelectorAll(".w"));
    var lineas = [], top = null;
    spans.forEach(function (s) {
      if (s.offsetTop !== top) { lineas.push([]); top = s.offsetTop; }
      lineas[lineas.length - 1].push(s.textContent);
    });
    el.innerHTML = lineas.map(function (l) {
      return '<span class="split-line"><span>' + l.join(" ") + "</span></span>";
    }).join("");
    return Array.prototype.slice.call(el.querySelectorAll(".split-line > span"));
  }

  /* ══════════ REVEALS ══════════ */
  function initReveals() {
    /* titulares: máscara por líneas */
    gsap.utils.toArray("[data-lines]").forEach(function (el) {
      var lineas = splitLines(el);
      gsap.fromTo(lineas, { yPercent: 110 }, {
        yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });

    /* bloques: fade + y (la variedad la dan clip/contador/pop) */
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.fromTo(el, { y: 44, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "expo.out",
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    /* imágenes: cortina clip-path + asentamiento de escala */
    gsap.utils.toArray("[data-clip]").forEach(function (fig) {
      var img = fig.querySelector("img");
      var desdeIzq = fig.getAttribute("data-dir") === "left";
      var tl = gsap.timeline({
        scrollTrigger: { trigger: fig, start: "top 82%", once: true }
      });
      /* sin clearProps: el CSS de html.sm-anim volvería a ocultarla */
      tl.to(fig, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2, ease: "expo.inOut"
      });
      if (img) tl.to(img, { scale: 1.08, duration: 1.4, ease: "expo.out" }, "<0.08");
    });

    /* parallax sutil con intensidades variadas */
    var intensidades = [6, 9, 12];
    gsap.utils.toArray(".sm-par").forEach(function (img, i) {
      var amp = intensidades[i % 3];
      gsap.fromTo(img, { yPercent: -amp }, {
        yPercent: amp, ease: "none",
        scrollTrigger: {
          trigger: img.closest("figure") || img,
          start: "top bottom", end: "bottom top", scrub: true
        }
      });
    });

    /* contadores — el HTML trae la cifra final (respaldo sin motor);
       aquí la bajamos a 0 justo antes de contar */
    gsap.utils.toArray("[data-count]").forEach(function (el) {
      var fin = parseFloat(el.getAttribute("data-count"));
      var obj = { v: 0 };
      el.textContent = "0";
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: fin, duration: 1.7, ease: "power2.out",
            onUpdate: function () { el.textContent = Math.round(obj.v).toLocaleString("es-MX"); }
          });
        }
      });
    });

    /* pines del mapa: pop elástico */
    var mapa = document.querySelector(".sm-mex-mapa");
    if (mapa) {
      gsap.from(".sm-pin", {
        scale: 0, duration: 1, ease: "elastic.out(1,0.4)", stagger: 0.12,
        scrollTrigger: { trigger: mapa, start: "top 70%", once: true }
      });
    }
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(initReveals);
  else initReveals();

  /* ══════════ S2 · IMAGEN FLOTANTE QUE SIGUE AL CURSOR ══════════ */
  var flotante = document.getElementById("floatImg");
  var filas = gsap.utils.toArray(".sm-row");
  if (finePointer && flotante && filas.length) {
    filas.forEach(function (fila, i) {
      var im = document.createElement("img");
      im.src = fila.getAttribute("data-img");
      im.alt = "";
      flotante.appendChild(im);
      fila.addEventListener("mouseenter", function () {
        flotante.querySelectorAll("img").forEach(function (otra, j) {
          otra.classList.toggle("-activa", i === j);
        });
      });
    });

    gsap.set(flotante, { xPercent: 8, yPercent: -50 });
    var fX = gsap.quickTo(flotante, "x", { duration: 0.55, ease: "power3" });
    var fY = gsap.quickTo(flotante, "y", { duration: 0.55, ease: "power3" });
    var rotX = 0;
    window.addEventListener("mousemove", function (e) {
      fX(e.clientX); fY(e.clientY);
      var giro = gsap.utils.clamp(-7, 7, e.movementX * 0.4);
      rotX += (giro - rotX) * 0.12;
      gsap.set(flotante, { rotation: rotX });
    });

    var lista = document.getElementById("filasHacemos");
    lista.addEventListener("mouseenter", function () {
      gsap.to(flotante, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
    });
    lista.addEventListener("mouseleave", function () {
      gsap.to(flotante, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: "power2.in" });
    });
    gsap.set(flotante, { scale: 0.85 });
  }

  /* ══════════ S3 · SCROLL HORIZONTAL ANCLADO ══════════ */
  var hWrap = document.getElementById("hWrap");
  var hTrack = document.getElementById("hTrack");

  ScrollTrigger.matchMedia({
    "(min-width: 861px)": function () {
      if (!hWrap || !hTrack) return;
      gsap.to(hTrack, {
        x: function () { return -(hTrack.scrollWidth - innerWidth); },
        ease: "none",
        scrollTrigger: {
          trigger: hWrap,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: function () { return "+=" + (hTrack.scrollWidth - innerWidth); }
        }
      });
    }
  });

  /* ══════════ S4 · MARQUESINA REACTIVA AL SCROLL ══════════ */
  var marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    var boost = { v: 1 };
    ScrollTrigger.create({
      onUpdate: function (self) {
        boost.v = 1 + Math.min(Math.abs(self.getVelocity()) / 700, 3);
      }
    });
    gsap.ticker.add(function () { boost.v += (1 - boost.v) * 0.04; });

    var marqueeTween = gsap.to(marqueeTrack, {
      xPercent: -50, repeat: -1, duration: 24, ease: "none", paused: true
    });
    var marqueeTick = function () {
      marqueeTween.timeScale(marqueeTween.timeScale() + (boost.v - marqueeTween.timeScale()) * 0.08);
    };
    ScrollTrigger.create({
      trigger: marqueeTrack.parentElement,
      start: "top bottom", end: "bottom top",
      onToggle: function (self) {
        if (self.isActive) { marqueeTween.play(); gsap.ticker.add(marqueeTick); }
        else { marqueeTween.pause(); gsap.ticker.remove(marqueeTick); }
      }
    });
  }

  /* ══════════ S5 · VIDEO EXPANDIBLE ══════════ */
  var videoSec = document.getElementById("videoSec");
  var videoFig = document.getElementById("videoFig");
  var video = document.getElementById("videoBanda");
  var btnSonido = document.getElementById("videoSound");

  if (videoSec && videoFig && video) {
    video.muted = true;
    /* con el motor activo, los controles nativos de respaldo estorban */
    video.removeAttribute("controls");
    if (btnSonido) {
      btnSonido.classList.add("-mudo");
      btnSonido.addEventListener("click", function () {
        video.muted = !video.muted;
        btnSonido.classList.toggle("-mudo", video.muted);
        btnSonido.setAttribute("aria-label", video.muted ? "Activar sonido del video" : "Silenciar video");
        if (video.paused) video.play().catch(function () {});
      });
    }

    /* reproducir solo cuando se ve */
    ScrollTrigger.create({
      trigger: videoSec, start: "top 80%", end: "bottom top",
      onToggle: function (self) {
        if (self.isActive) video.play().catch(function () {});
        else video.pause();
      }
    });

    ScrollTrigger.matchMedia({
      /* escritorio: se ancla y el recorte se abre a pantalla completa */
      "(min-width: 861px)": function () {
        gsap.timeline({
          scrollTrigger: {
            trigger: videoSec, pin: true, scrub: 1,
            start: "top top", end: "+=120%", anticipatePin: 1
          }
        })
          .fromTo(videoFig,
            { clipPath: "inset(14% 16% round 1.4rem)", scale: 0.96 },
            { clipPath: "inset(0% 0% round 0rem)", scale: 1, duration: 0.55, ease: "none" })
          .to(videoFig, { duration: 0.45 });
      },
      /* móvil: cortina simple una sola vez */
      "(max-width: 860px)": function () {
        gsap.fromTo(videoFig,
          { clipPath: "inset(6% 7% round 1.2rem)" },
          {
            clipPath: "inset(0% 0% round 0rem)", duration: 1.2, ease: "expo.inOut",
            scrollTrigger: { trigger: videoSec, start: "top 70%", once: true }
          });
      }
    });
  }

  /* ══════════ S6 · SKEW POR VELOCIDAD (solo imágenes de galería) ══════════ */
  if (finePointer) {
    var proxy = { skew: 0 };
    var skewSetter = gsap.quickSetter(".skew-el", "skewY", "deg");
    var clampSkew = gsap.utils.clamp(-6, 6);
    ScrollTrigger.create({
      onUpdate: function (self) {
        var s = clampSkew(self.getVelocity() / -350);
        if (Math.abs(s) > Math.abs(proxy.skew)) {
          proxy.skew = s;
          gsap.to(proxy, {
            skew: 0, duration: 0.8, ease: "power3", overwrite: true,
            onUpdate: function () { skewSetter(proxy.skew); }
          });
        }
      }
    });
  }

  /* ══════════ S7 · DATOS BANCARIOS + COPIAR CLABE ══════════
     Cuando haya cuenta: llenar data-clabe (18 dígitos) y data-banco en el
     HTML; esto muestra las filas y cambia "Pedir la CLABE" por "Copiar". */
  var clabeEl = document.getElementById("donaClabe");
  var btnClabe = document.getElementById("btnCopiarClabe");
  var btnPedir = document.getElementById("btnPedirClabe");
  if (clabeEl && btnClabe) {
    var clabe = (clabeEl.getAttribute("data-clabe") || "").replace(/\s+/g, "");
    var banco = document.getElementById("donaBanco");
    var nombreBanco = banco ? (banco.getAttribute("data-banco") || "").trim() : "";
    if (clabe.length >= 18) {
      clabeEl.textContent = clabe.replace(/(\d{4})(?=\d)/g, "$1 ");
      var filaClabe = document.getElementById("filaClabe");
      if (filaClabe) filaClabe.hidden = false;
      if (nombreBanco && banco) {
        banco.textContent = nombreBanco;
        var filaBanco = document.getElementById("filaBanco");
        if (filaBanco) filaBanco.hidden = false;
      }
      btnClabe.hidden = false;
      if (btnPedir) btnPedir.hidden = true;
      btnClabe.addEventListener("click", function () {
        navigator.clipboard.writeText(clabe).then(function () {
          var t = btnClabe.querySelector(".t");
          t.textContent = "¡Copiada!";
          t.setAttribute("data-text", "¡Copiada!");
          gsap.fromTo(btnClabe, { scale: 0.9 }, { scale: 1, duration: 0.9, ease: "elastic.out(1,0.4)" });
          setTimeout(function () {
            t.textContent = "Copiar CLABE";
            t.setAttribute("data-text", "Copiar CLABE");
          }, 2200);
        }).catch(function () {});
      });
    }
  }

  /* ══════════ S10 · FAQ (una abierta, con altura animada) ══════════ */
  var faqs = Array.prototype.slice.call(document.querySelectorAll(".sm-faq-item"));

  function cerrarFaq(item) {
    var cuerpo = item.querySelector(".sm-faq-body");
    gsap.killTweensOf(cuerpo);
    gsap.to(cuerpo, {
      height: 0, duration: 0.35, ease: "power2.in", overwrite: true,
      onComplete: function () { item.open = false; gsap.set(cuerpo, { clearProps: "height" }); }
    });
  }

  faqs.forEach(function (item) {
    var cuerpo = item.querySelector(".sm-faq-body");
    var summary = item.querySelector("summary");
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      if (item.open) {
        cerrarFaq(item);
      } else {
        faqs.forEach(function (otro) { if (otro !== item && otro.open) cerrarFaq(otro); });
        gsap.killTweensOf(cuerpo);
        item.open = true;
        gsap.fromTo(cuerpo, { height: 0 }, {
          height: "auto", duration: 0.6, ease: "expo.out", overwrite: true,
          onComplete: function () { if (item.open) gsap.set(cuerpo, { clearProps: "height" }); }
        });
      }
    });
  });

  /* ══════════ refrescar cuando cargan las imágenes ══════════ */
  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });

  /* ══════════ resize: deshacer el split para que el texto refluya ══════════
     Los titulares partidos en líneas no pueden re-envolver el texto; si el
     ancho cambia de verdad (girar el teléfono, redimensionar la ventana),
     se restaura el texto plano — los reveals ya jugaron su papel. */
  var textosOriginales = new Map();
  document.querySelectorAll("[data-lines]").forEach(function (el) {
    textosOriginales.set(el, el.textContent.trim().replace(/\s+/g, " "));
  });

  var anchoPrevio = window.innerWidth;
  var timerResize = null;
  window.addEventListener("resize", function () {
    clearTimeout(timerResize);
    timerResize = setTimeout(function () {
      if (Math.abs(window.innerWidth - anchoPrevio) < 80) return;
      anchoPrevio = window.innerWidth;
      textosOriginales.forEach(function (texto, el) {
        if (el.querySelector(".split-line")) el.textContent = texto;
      });
      ScrollTrigger.refresh();
    }, 300);
  });
})();
