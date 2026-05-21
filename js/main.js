document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // 1. Control del Header en Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Animaciones de Aparición (Scroll Reveal)
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 3. Menú Hamburguesa Lógica
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 4. Cierre exterior del menú
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});


// 2. Animaciones de Aparición (Scroll Reveal) y Contadores Numéricos
    const observerOptions = { threshold: 0.15 };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase active para la animación de entrada (fadeUp)
                entry.target.classList.add('active');

                // LÓGICA DEL CONTADOR ANIMADO
                if (entry.target.classList.contains('stats-section')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    const speed = 200; // Mientras más bajo, más rápido corre la animación

                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target'); // Extrae el número del HTML
                        
                        const updateCount = () => {
                            const count = +counter.innerText;
                            // Divide el total entre la velocidad para saber cuánto sumar por cada "frame"
                            const increment = target / speed; 

                            if (count < target) {
                                counter.innerText = Math.ceil(count + increment);
                                setTimeout(updateCount, 15); // Ejecuta de nuevo en 15 milisegundos
                            } else {
                                counter.innerText = target; // Asegura que termine exactamente en el número final
                            }
                        };
                        updateCount();
                    });

                    // Desvincula el observador de esta sección para que los números no vuelvan a contar si subes y bajas
                    observer.unobserve(entry.target); 
                }
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    
    
/* ==========================================================================
   LÓGICA DE LOS DROPDOWNS EN MÓVILES (SOPORTA MÚLTIPLES MENÚS)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos TODOS los botones desplegables del menú
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // Bloquea redirecciones
            e.stopPropagation(); // Evita clics accidentales debajo del menú

            if (window.innerWidth <= 992) {
                // Selecciona el submenú específico que está justo debajo de ESTE botón
                const dropdownMenu = this.nextElementSibling;
                
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    
                    // (Opcional UX) Cierra otros menús que estén abiertos para no amontonar
                    document.querySelectorAll('.dropdown-menu.show-dropdown').forEach(function(menu) {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('show-dropdown');
                        }
                    });

                    // Abre o cierra el menú que acabamos de tocar
                    dropdownMenu.classList.toggle('show-dropdown');
                }
            }
        });
    });
});


/* ==========================================================================
   LÓGICA PARA SUB-PÁGINAS (SIDEBAR TABS - INFO.HTML)
   ========================================================================== */
window.openInfoSection = function(evt, sectionName) {
    var i, tabcontent, tablinks;
    
    // Oculta todo el contenido
    tabcontent = document.getElementsByClassName("tab-section");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    // Quita la clase 'active' de todos los botones
    tablinks = document.getElementsByClassName("side-tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Muestra la sección clickeada
    var targetSection = document.getElementById(sectionName);
    if(targetSection) {
        targetSection.style.display = "block";
        // Un pequeño retraso para que la animación CSS funcione correctamente
        setTimeout(function() {
            targetSection.classList.add("active");
        }, 10);
    }
    
    // Activa el botón actual
    if(evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
    }
};

/* ==========================================================================
   LÓGICA PARA ABRIR PESTAÑAS DESDE ENLACES EXTERNOS (URL HASH)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Revisamos si la URL tiene un # (ej: submissions#sec-cfp)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Quita el '#' y se queda con 'sec-cfp'
        
        // Buscamos si existe una sección con ese ID
        const targetSection = document.getElementById(targetId);
        
        if (targetSection && targetSection.classList.contains('tab-section')) {
            // Buscamos el botón en el menú lateral que abre esta sección
            // Usamos un selector que busque la función onclick que contiene el ID
            const targetButton = document.querySelector(`.side-tab-btn[onclick*="${targetId}"]`);
            
            if (targetButton) {
                // Simulamos un clic en el botón para que se ejecute tu función openInfoSection
                targetButton.click();
                
                // Si estás en móvil, hacemos scroll suave hacia la zona del contenido 
                // para que el usuario no se quede atascado viendo el menú
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        const contentArea = document.querySelector('.content-area');
                        if (contentArea) {
                            window.scrollTo({
                                top: contentArea.offsetTop - 100, // -100 para dejar espacio para el Header fijo
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            }
        }
    }
});
