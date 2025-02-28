
  // ================================
  // Inicialización de todas las funcionalidades
  // ================================
  initNavbar();           // Inicializar la barra de navegación con efecto de scroll
  initParallax();         // Inicializar efectos parallax
  generateCalendar();     // Generar el calendario
  setupCalendarModal();   // Configurar el modal del calendario
  updateCountdown();      // Actualizar el contador
  setInterval(updateCountdown, 1000);
  handleScrollAnimation(); // Inicializar animaciones de scroll para galería
  




  document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loading-screen");
    const sobreContainer = document.getElementById("sobreContainer");
    const contenidoPrincipal = document.getElementById("contenidoPrincipal");

    let animationRunning = true; // Variable para controlar la animación

    // Asegurar que el sobre y el contenido principal no se muestren antes de la animación
    sobreContainer.style.display = "none";
    contenidoPrincipal.style.display = "none";

    // Iniciar la animación de la libélula
    startAnimation();

    setTimeout(() => {
        // Detener la animación antes de ocultar la pantalla de carga
        animationRunning = false;
        
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
            loadingScreen.style.display = "none";
            sobreContainer.style.display = "flex";
            setTimeout(() => {
                contenidoPrincipal.style.display = "block";
                gsap.to(contenidoPrincipal, { opacity: 1, duration: 1 });
                
                // Inicializar Parallax después de la pantalla de carga
                initParallax();
                ScrollTrigger.refresh();
            }, 500);
        }, 1000);
    }, 5000);


    function startAnimation() {
        const libelula = document.getElementById("libelula");
        const trailSVG = document.getElementById("trail");
        const container = document.getElementById("container");

        function updateDimensions() {
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            const centerX = containerWidth / 2;
            const centerY = containerHeight / 2;
            const radius = Math.min(containerWidth, containerHeight) * 0.30;

            trailSVG.setAttribute("width", containerWidth);
            trailSVG.setAttribute("height", containerHeight);

            let angle = 0;
            let prevX = centerX;
            let prevY = centerY;
            let pathData = `M ${centerX} ${centerY}`;

            while (trailSVG.firstChild) {
                trailSVG.removeChild(trailSVG.firstChild);
            }

            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("fill", "none");
            pathElement.setAttribute("stroke", "#8fa9dd");
            pathElement.setAttribute("stroke-width", containerWidth * 0.004);
            pathElement.setAttribute("stroke-opacity", "0.3");
            trailSVG.appendChild(pathElement);

            function animate() {
                if (!animationRunning) {
                    return; // Si la animación debe detenerse, salimos de la función
                }

                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);

                const dx = x - prevX;
                const dy = y - prevY;
                const rotation = Math.atan2(dy, dx) * 180 / Math.PI;

                const libelulaSize = Math.min(containerWidth, containerHeight) * 0.4;
                libelula.style.left = (x - libelulaSize / 2) + "px";
                libelula.style.top = (y - libelulaSize / 2) + "px";
                libelula.style.transform = `rotate(${rotation + 140}deg)`;
                libelula.style.width = libelulaSize + "px";
                libelula.style.height = libelulaSize + "px";

                pathData += ` L ${x} ${y}`;
                pathElement.setAttribute("d", pathData);

                prevX = x;
                prevY = y;

                angle += 0.04;

                if (angle > 5) {
                    const svgPoints = pathElement.getAttribute("d").split(" ");
                    if (svgPoints.length > 30) {
                        svgPoints.splice(1, 3);
                        pathData = svgPoints.join(" ");
                        pathElement.setAttribute("d", pathData);
                    }
                }

                requestAnimationFrame(animate);
            }

            animate();
        }

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
    }
});











  // Esta función estará separada del resto de tus funciones
// Colócala al principio de tu archivo JavaScript
(function() {
  // Ejecutar inmediatamente cuando se cargue
  const navbar = document.querySelector('.navbar');
  const parallaxSection = document.querySelector('.parallax');
  
  if (!navbar || !parallaxSection) return;
  
  function checkNavbarVisibility() {
    const parallaxRect = parallaxSection.getBoundingClientRect();
    if (parallaxRect.top <= 0) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  }
  
  // Verificar al cargar
  window.addEventListener('load', checkNavbarVisibility);
  
  // Verificar al hacer scroll
  window.addEventListener('scroll', checkNavbarVisibility);
})();

// Función principal que se ejecutará cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {

  // ================================
// carga de imagenes
// ================================
  // Esperar a que la imagen layer2 cargue completamente
  const layer2 = document.querySelector(".layer2");
  if (layer2) {
    if (layer2.complete) {
      layer2.classList.add("loaded");
    } else {
      layer2.onload = () => {
        layer2.classList.add("loaded");
      };
    }
  }
});

// Función para precargar imágenes (punto 3)
function preloadImages() {
  const images = document.querySelectorAll('.photo-container img');
  let loadedCount = 0;
  
  images.forEach(img => {
    // Si la imagen ya está cargada
    if (img.complete) {
      loadedCount++;
      if (loadedCount === images.length) {
        handleScrollAnimation();
      }
    } else {
      // Si la imagen está cargando
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          handleScrollAnimation();
        }
      };
    }
  });
}


// ================================
// ABRIR CARTA  
// ================================
function abrirSobre() {
  const sobre = document.getElementById('sobre');
  const sobreContainer = document.getElementById('sobreContainer');
  const contenido = document.getElementById('contenidoPrincipal');
  const body = document.body;
  const html = document.documentElement;
  const audio = document.getElementById('background-music'); // Seleccionar el audio

  // Bloquear scroll mientras se abre el sobre
  body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
  body.style.height = '100vh';
  html.style.height = '100vh';

  sobre.classList.add('abierto');

  setTimeout(() => {
      gsap.to(sobreContainer, { opacity: 0, duration: 1, onComplete: () => {
          sobreContainer.style.display = 'none';
          contenido.style.display = 'block';

          gsap.to(contenido, { opacity: 1, duration: 1, onComplete: () => {
              // Restaurar el scroll
              body.style.overflow = 'auto';
              html.style.overflow = 'auto';
              body.style.height = 'auto';
              html.style.height = 'auto';

              setTimeout(initParallax, 500);  

              // Intentar reproducir el audio al abrir el sobre
              if (audio) {
                  audio.play().catch(error => console.log('El navegador bloqueó el autoplay:', error));
              }
          }});
      }});
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('background-music');
  const muteButton = document.getElementById('mute-button'); // Botón de mute
  let muteIcon = document.getElementById('mute-icon'); // Ícono del botón

  const playIcon = 'icono/mute2.svg';  // Ícono cuando está en pausa
  const muteIconPath = 'icono/play.svg'; // Ícono cuando está sonando

  function actualizarIcono() {
      muteIcon.src = audio.paused ? playIcon : muteIconPath;
  }

  // Verificar si el audio ya está sonando al cargar la página
  setTimeout(actualizarIcono, 500);

  muteButton.addEventListener('click', function() {
      if (audio.paused) {
          audio.play().catch(error => console.log('Error al reproducir:', error));
      } else {
          audio.pause();
      }
      actualizarIcono(); // Actualizar el ícono inmediatamente después del clic
  });

  // Asegurar que el icono se mantenga sincronizado si el audio cambia de estado fuera del botón
  audio.addEventListener('play', actualizarIcono);
  audio.addEventListener('pause', actualizarIcono);
});


// ================================
// Navbar con aparición al scroll
// ================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const calendarioSection = document.getElementById('fecha'); // Sección del calendario

  if (!navbar || !calendarioSection) return;

  // Ocultar la barra al inicio
  navbar.style.opacity = '0';
  navbar.style.transform = 'translateY(-100%)';
  navbar.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  function checkNavbarVisibility() {
    const calendarioRect = calendarioSection.getBoundingClientRect();
    const scrollY = window.scrollY;
  
    if (calendarioRect.top <= window.innerHeight * 0.5) {
      navbar.style.opacity = '1';
      navbar.style.transform = 'translateY(0)';
    } else if (scrollY < 100) {
      // Retrasamos la desaparición de la barra de navegación
      setTimeout(() => {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';
      }, 1000); // Se retrasa 300ms para que cubra mientras se acomoda el parallax
    }
  
  

  // Verificar al hacer scroll
  window.addEventListener('scroll', checkNavbarVisibility);
}
  // Verificar al cargar la página
  checkNavbarVisibility();
  
  // Verificar al hacer scroll
  window.addEventListener('scroll', checkNavbarVisibility);
  
  // Manejo del menú hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navList.classList.toggle('active');
    });
    
    // Manejo de los enlaces del menú para scroll suave
    document.querySelectorAll('.nav-list a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        navList.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }
}

// ================================
// Parallax
// ================================
function initParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Detectar si es dispositivo móvil o táctil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Configurar ScrollTrigger para mejor rendimiento
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true
  });

  // Manejar comportamiento específico por dispositivo
  ScrollTrigger.matchMedia({
    // Desktop (pantallas grandes)
    "(min-width: 769px)": function() {
      // Parallax para cada capa
      gsap.utils.toArray(".layer").forEach(layer => {
        const speed = layer.getAttribute("data-speed") || 0.1;
      
        gsap.to(layer, {
          y: () => window.innerHeight * speed,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".parallax",
            start: "top top",
            end: "bottom top",
            scrub: 1.3,
            invalidateOnRefresh: true,
            fastScrollEnd: false
          }
        });
      });
      
      // Parallax para el fondo del contador
      const countdownBg = document.querySelector('.countdown-background');
      if (countdownBg) {
        gsap.to('.countdown-background', {
          yPercent: 15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".countdown-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
            invalidateOnRefresh: true
          }
        });
      }
    },
    
    // Versión para móviles/tablets - parallax más sutil o sin parallax
    "(max-width: 768px)": function() {
      // Parallax muy ligero solo para layer2 en móvil
      const layer2 = document.querySelector('.layer2');
      if (layer2) {
        gsap.to(layer2, {
          y: () => window.innerHeight * 0.03, // Movimiento muy sutil
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".parallax",
            start: "top top",
            end: "bottom top",
            scrub: 3, // Más suave en dispositivos táctiles
            invalidateOnRefresh: true
          }
        });
      }
      
      // Para el fondo del contador en móvil
      const countdownBg = document.querySelector('.countdown-background');
      if (countdownBg) {
        gsap.to('.countdown-background', {
          yPercent: 5, // Movimiento muy reducido para móvil
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".countdown-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
            invalidateOnRefresh: true
          }
        });
      }
    }
  });
  
  // Función para recargar ScrollTrigger cuando cambia la orientación del dispositivo
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      ScrollTrigger.refresh();
    }, 200);
  });
}

// Asegúrate de llamar a initParallax después de que todo esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Esperar a que las imágenes se carguen
  window.addEventListener('load', function() {
    // Añadir clase 'loaded' a layer2 para la transición de opacidad
    const layer2 = document.querySelector('.layer2');
    if (layer2) {
      layer2.classList.add('loaded');
    }
    
    // Iniciar el parallax
    initParallax();
  });
});


// ================================
// Calendario
// ================================
function generateCalendar() {
  const daysContainer = document.querySelector('.days');
  if (!daysContainer) return;
  
  const targetDate = new Date(2025, 5, 7); // Junio es 5 (0-based)
  const firstDay = new Date(2025, 5, 1);
  const lastDay = new Date(2025, 5 + 1, 0);
  
  const startPadding = firstDay.getDay();
  daysContainer.innerHTML = ''; // Limpiar el contenedor
  
  // Días vacíos al inicio
  for(let i = 0; i < startPadding; i++) {
    const dayDiv = document.createElement('div');
    daysContainer.appendChild(dayDiv);
  }
  
  // Días del mes
  for(let i = 1; i <= lastDay.getDate(); i++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = i;
    
    if(i === targetDate.getDate()) {
      dayDiv.classList.add('highlight');
    }
    
    daysContainer.appendChild(dayDiv);
  }
}

function setupCalendarModal() {
  const calendarContainer = document.querySelector('.calendar-container');
  const modal = document.querySelector('.calendar-modal');
  const closeBtn = document.querySelector('.close-modal');
  const googleBtn = document.querySelector('.google-calendar');
  const appleBtn = document.querySelector('.apple-calendar');
  
  if (!calendarContainer || !modal) return;

  calendarContainer.addEventListener('click', () => {
    modal.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  function generateCalendarLink(type) {
    const event = {
      title: 'Boda de Mariana y Alonso',
      description: 'Celebración de nuestra boda',
      location: 'Por definir',
      startDate: '20250607T180000',
      endDate: '20250608T000000'
    };

    if (type === 'google') {
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.startDate}/${event.endDate}`;
      window.open(googleUrl, '_blank');
    } else if (type === 'apple') {
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.startDate}
DTEND:${event.endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
      
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'boda_mariana_alonso.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    modal.classList.remove('active');
  }

  if (googleBtn) {
    googleBtn.addEventListener('click', () => generateCalendarLink('google'));
  }
  
  if (appleBtn) {
    appleBtn.addEventListener('click', () => generateCalendarLink('apple'));
  }
}

// ================================
// Contador
// ================================
function updateCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  const targetDate = new Date(2025, 5, 7, 0, 0, 0).getTime(); // Junio es 5 (0-based)
  const now = new Date().getTime();
  const difference = targetDate - now;
  
  if (difference <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}


// ================================
// Animaciones de Scroll para Galería
// ================================
// Modificar la función de detección de viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  
  // Umbral más generoso para dispositivos móviles
  const threshold = window.innerWidth < 768 ? 50 : 100;
  
  return (
    rect.top <= (window.innerHeight - threshold) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth - threshold) &&
    rect.right >= 0
  );
}

// Añadir esta función para forzar la visibilidad en carga inicial
function forceVisibilityOnLoad() {
  // Esperar un poco después de la carga para asegurar que todo esté listo
  setTimeout(() => {
    const containers = document.querySelectorAll('.photo-container');
    containers.forEach((container, index) => {
      setTimeout(() => {
        container.classList.add('visible');
      }, index * 100);
    });
  }, 300);
}

// Llamar a esta función cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation();
  
  // En dispositivos móviles, forzar la visibilidad
  if (window.innerWidth <= 768) {
    forceVisibilityOnLoad();
  }
});

function handleScrollAnimation() {
  const containers = document.querySelectorAll('.photo-container');
  if (!containers.length) return;
  
  containers.forEach((container, index) => {
    if (isElementInViewport(container)) {
      // Agregar un pequeño retraso para cada foto
      setTimeout(() => {
        container.classList.add('visible');
      }, index * 100); // 100ms de retraso entre cada foto
    } else {
      container.classList.remove('visible');
    }
  });
}

// Configurar listener de scroll con debounce para mejor rendimiento
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    handleScrollAnimation();
  });
}, { passive: true });

// Ejecutar si cambia el tamaño de la ventana
window.addEventListener('resize', () => {
  requestAnimationFrame(handleScrollAnimation);
});



// ================================
// Calendario
// ================================

// Añadir esta función a tu archivo script.js existente
document.addEventListener('DOMContentLoaded', function() {
  // Función para generar el calendario
  function generarCalendario() {
    const daysContainer = document.querySelector('.days');
    if (!daysContainer) return;
    
    // Limpiar el contenedor
    daysContainer.innerHTML = '';
    
    // Añadir espacios en blanco para los días previos al primer día de junio
    // Asumiendo que junio 2025 comienza en domingo (0)
    // Para ajustar según el día correcto, modifica este valor
    const primerDiaDeMes = 0; // 0 = domingo, 1 = lunes, etc.
    
    // Agregar espacios en blanco
    for (let i = 0; i < primerDiaDeMes; i++) {
      const emptyDay = document.createElement('div');
      daysContainer.appendChild(emptyDay);
    }
    
    // Añadir los días del mes (junio tiene 30 días)
    for (let i = 1; i <= 30; i++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = i;
      
      // Destacar el día 7 (el día de la boda)
      if (i === 7) {
        dayElement.classList.add('highlight');
        
        // Opcionalmente: crear un SVG de corazón personalizado dentro del día
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "40");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.style.position = "absolute";
        svg.style.top = "50%";
        svg.style.left = "50%";
        svg.style.transform = "translate(-50%, -50%)";
        svg.style.zIndex = "-1";
        
        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#85a78a");
        path.setAttribute("stroke-width", "1.5");
        path.classList.add("heart-outline");
        
        svg.appendChild(path);
        dayElement.appendChild(svg);
        
        // Añadir animación con JavaScript
        const animateHeart = () => {
          let scale = 1;
          let growing = true;
          
          setInterval(() => {
            if (growing) {
              scale += 0.01;
              if (scale >= 1.2) growing = false;
            } else {
              scale -= 0.01;
              if (scale <= 1) growing = true;
            }
            
            svg.style.transform = `translate(-50%, -50%) scale(${scale})`;
          }, 30);
        };
        
        animateHeart();
      }
      
      daysContainer.appendChild(dayElement);
    }
  }

  // Inicializar el calendario
  generarCalendario();
});




// ================================
// Más opciones Hospedaje 
// ================================

// Función para alternar la visibilidad de los hoteles adicionales
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar elementos relevantes
  const hotelCards = document.querySelectorAll('.hotel-card');
  const toggleButton = document.getElementById('toggleHoteles');
  
  // Ocultar los hoteles 3, 4 y 5 inicialmente (índices 2, 3, 4)
  if (hotelCards.length > 2) {
    for (let i = 2; i < hotelCards.length; i++) {
      hotelCards[i].style.display = 'none';
      hotelCards[i].classList.add('hotel-hidden');
    }
  }
  
  // Agregar evento de clic al botón
  toggleButton.addEventListener('click', function() {
    const hiddenHotels = document.querySelectorAll('.hotel-hidden');
    const isExpanded = toggleButton.getAttribute('data-expanded') === 'true';
    
    hiddenHotels.forEach(hotel => {
      hotel.style.display = isExpanded ? 'none' : 'block';
      
      // Aplicar una animación simple de fade-in cuando aparecen
      if (!isExpanded) {
        hotel.style.opacity = 0;
        hotel.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          hotel.style.opacity = 1;
        }, 10);
      }
    });
    
    // Actualizar el estado y el texto del botón
    const newState = !isExpanded;
    toggleButton.setAttribute('data-expanded', newState);
    toggleButton.textContent = newState ? 'Menos opciones' : 'Más opciones';
  });
});



// ================================
// Modal de Confirmación de Asistencia
// ================================

// Agregar el modal al HTML dinámicamente si no existe
function agregarModalConfirmacion() {
  if (document.getElementById("modalConfirmacion")) return; // Evitar duplicados

  const modal = document.createElement("div");
  modal.id = "modalConfirmacion";
  modal.classList.add("modal-overlay");
  
  modal.innerHTML = `
    <div class="modal-container">
      <!-- Cuadro secundario (Detalles de la confirmación) -->
      <div class="modal-box secondary">
        <h2 class="modal-title">CONFIRMACIÓN DE ASISTENCIA</h2>
        <h3 id="nombreInvitado">Nombre del Invitado</h3>
        <p class="modal-message">Estamos muy felices de que nos acompañes en este día especial.</p>
      </div>
      
      <!-- Cuadro principal -->
      <div class="modal-box primary">
      <h2><strong>Invitaciones</strong></h2>
        <h3><strong>Disponibles:</strong> <span id="invitacionesDisponibles">0</span></h3>
        <p>
          <strong>Número de invitados a confirmar:</strong> 
          <input type="number" id="confirmadas-modal" min="1" value="1" class="input-numero">
        </p>
        <button id="confirmarAsistencia" class="btn-confirmar">CONFIRMAR ASISTENCIA</button>
        <button id="cerrarModal" class="btn-secundario">Cerrar</button>
        <p id="mensajeConfirmacion" class="mensaje-confirmacion"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);


  setTimeout(() => {
    const title = document.querySelector('.modal-box.secondary .modal-title');
    const message = document.querySelector('.modal-box.secondary .modal-message');
    
    // Forzar visibilidad
    if (title) title.style.display = 'block';
    if (message) message.style.display = 'block';
  }, 50);


  // Agregar eventos
  document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
  document.getElementById("confirmarAsistencia").addEventListener("click", confirmarAsistencia);
  
  // Agregar validación para el input numérico
  const confirmadasModal = document.getElementById("confirmadas-modal");
  confirmadasModal.addEventListener('input', function() {
    const max = parseInt(this.getAttribute("max"), 10) || 0;
    const valor = parseInt(this.value, 10) || 0;
    
    if (valor > max) {
      this.value = max;
    } else if (valor < 1) {
      this.value = 1;
    }
  });
}


// Función para verificar el código y mostrar modal
function verificarCodigo() {
  let codigo = document.getElementById("codigoInput").value;
  
  if (!codigo) {
    alert("Por favor ingresa un código de invitado");
    return;
  }

  fetch("verificar.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "codigo=" + encodeURIComponent(codigo)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "success") {
      // Crear y mostrar el modal
      agregarModalConfirmacion();
      
      // Actualizar información en el modal
      document.getElementById("nombreInvitado").textContent = data.data.nombre;
      document.getElementById("invitacionesDisponibles").textContent = data.data.invitaciones_disponibles;
      
      // Configurar límites para el campo de entrada
      const confirmadas = document.getElementById("confirmadas-modal");
      confirmadas.setAttribute("max", data.data.invitaciones_disponibles);
      confirmadas.value = "1"; // Valor predeterminado
      
      // Mostrar el modal
      document.getElementById("modalConfirmacion").classList.add("active");
      
      // Limpiar mensaje de confirmación anterior si existe
      document.getElementById("mensajeConfirmacion").textContent = "";
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error("Error en la solicitud:", error);
    alert("Error de conexión con el servidor. Inténtalo más tarde.");
  });
}

// Función para confirmar la asistencia
function confirmarAsistencia() {
  let codigo = document.getElementById("codigoInput").value;
  let confirmadasInput = document.getElementById("confirmadas-modal");
  let confirmadas = parseInt(confirmadasInput.value, 10);
  let maxInvitados = parseInt(document.getElementById("invitacionesDisponibles").textContent, 10);
  let mensajeConfirmacion = document.getElementById("mensajeConfirmacion");

  console.log("Valor en el input confirmadas:", confirmadasInput.value);
  console.log("Número de invitados a confirmar:", confirmadas);
  console.log("Máximo permitido:", maxInvitados);

  if (!confirmadas || confirmadas < 1 || confirmadas > maxInvitados) {
    mensajeConfirmacion.textContent = "Por favor, ingresa un número válido de invitados dentro del rango permitido.";
    mensajeConfirmacion.style.color = "red";
    return;
  }

  fetch("confirmar.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `codigo=${encodeURIComponent(codigo)}&confirmadas=${confirmadas}`
  })
  .then(response => response.json())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    if (data.status === "success") {
      mensajeConfirmacion.textContent = `¡Gracias! Asistencia confirmada exitosamente para ${confirmadas} invitados.`;
      mensajeConfirmacion.style.color = "green";
      
      // Actualizar el número de invitaciones disponibles después de confirmar
      if (data.data && data.data.invitaciones_disponibles !== undefined) {
        document.getElementById("invitacionesDisponibles").textContent = data.data.invitaciones_disponibles;
        // Actualizar también el valor máximo del input
        document.getElementById("confirmadas-modal").setAttribute("max", data.data.invitaciones_disponibles);
        // Resetear el valor del input si ya no hay invitaciones disponibles
        if (data.data.invitaciones_disponibles <= 0) {
          document.getElementById("confirmadas-modal").value = "0";
          document.getElementById("confirmadas-modal").disabled = true;
          
          // Opcional: Cerrar el modal después de unos segundos si no hay más invitaciones
          setTimeout(cerrarModal, 3000);
        }
      }
    } else {
      mensajeConfirmacion.textContent = data.message;
      mensajeConfirmacion.style.color = "red";
    }
  })
  .catch(error => {
    console.error("Error en la solicitud:", error);
    mensajeConfirmacion.textContent = "Error de conexión con el servidor. Inténtalo más tarde.";
    mensajeConfirmacion.style.color = "red";
  });
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modalConfirmacion");
  if (modal) {
    modal.classList.remove("active");
  }
}




document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const bbvaLink = document.getElementById('bbva-link');
  const modal = document.getElementById('bbva-modal');
  const closeBtn = document.querySelector('.close-bbva');
  const copyBtn = document.getElementById('copy-button');
  const accountNumber = document.getElementById('account-number');
  const copyMessage = document.getElementById('copy-message');
  
  console.log("Botón de cierre encontrado:", closeBtn); // Verificar que no sea null
  // Variable para guardar la posición de scroll
  let scrollPosition = 0;
  
  // Abrir modal
  bbvaLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Guardar la posición actual del scroll
    scrollPosition = window.pageYOffset;
    
    // Mostrar el modal
    modal.style.display = 'flex';
    
    // Bloquear el scroll de manera efectiva
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollPosition}px`;
  });
  
  // Cerrar modal con el botón X - CORREGIDO
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Evita que el evento se propague
    closeModal();
    console.log("Botón de cierre clickeado"); // Para depuración
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Evitar que los clics dentro del contenido del modal cierren el modal
  document.querySelector('.modal-content').addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Cerrar modal con la tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
  
  // Función para cerrar el modal
  function closeModal() {
    modal.style.display = 'none';
    
    // Restaurar el scroll
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = '';
    
    // Volver a la posición de scroll original
    window.scrollTo(0, scrollPosition);
    
    // Ocultar mensaje de copiado
    copyMessage.style.display = 'none';
  }
  
  // Función para copiar número de cuenta
  copyBtn.addEventListener('click', function() {
    try {
      // Crear un elemento de texto temporal
      const textArea = document.createElement('textarea');
      textArea.value = accountNumber.textContent;
      document.body.appendChild(textArea);
      
      // Seleccionar y copiar el texto
      textArea.select();
      const success = document.execCommand('copy');
      
      // Eliminar el elemento temporal
      document.body.removeChild(textArea);
      
      // Mostrar mensaje de confirmación
      if (success) {
        copyMessage.style.display = 'inline';
        
        // Ocultar el mensaje después de 2 segundos
        setTimeout(function() {
          copyMessage.style.display = 'none';
        }, 2000);
      }
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  });
});