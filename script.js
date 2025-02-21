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
  // Inicialización de todas las funcionalidades
  // ================================
  initNavbar();           // Inicializar la barra de navegación con efecto de scroll
  initParallax();         // Inicializar efectos parallax
  generateCalendar();     // Generar el calendario
  setupCalendarModal();   // Configurar el modal del calendario
  updateCountdown();      // Actualizar el contador
  setInterval(updateCountdown, 1000);
  handleScrollAnimation(); // Inicializar animaciones de scroll para galería
  
  // Configuración inicial de GSAP
  if (typeof gsap !== 'undefined') {
    gsap.config({
      force3D: true
    });
  }
  
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

  // Configurar ScrollTrigger para mejor rendimiento
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true
  });

  // Aplicar parallax solo en pantallas grandes
  if (window.innerWidth > 768) {
    gsap.utils.toArray(".layer").forEach(layer => {
      const speed = layer.getAttribute("data-speed") || 0.15; // Reducimos aún más la velocidad
    
      gsap.to(layer, {
        y: () => window.innerHeight * speed,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".parallax",
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
          invalidateOnRefresh: true,
          fastScrollEnd: false
        }
      });
    });
    

    // Parallax más sutil en el fondo del contador
    const countdownBg = document.querySelector('.countdown-background');
    if (countdownBg) {
      gsap.to('.countdown-background', {
        yPercent: 15,  // Menos movimiento para evitar saltos
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".countdown-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 2.5,  // Suaviza el desplazamiento
          invalidateOnRefresh: true
        }
      });
    }
  }
}


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
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const threshold = 100;
  
  return (
    rect.top <= (window.innerHeight - threshold) &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth - threshold) &&
    rect.right >= 0
  );
}

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