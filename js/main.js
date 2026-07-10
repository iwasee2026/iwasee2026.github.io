document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    /* ==========================================================================
       1. CONTROL DEL HEADER EN SCROLL
       ========================================================================== */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. SCROLL REVEAL + CONTADORES
       ========================================================================== */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            // Activa la animación
            entry.target.classList.add('active');

            // Si es la sección de estadísticas, inicia el contador
            if (entry.target.classList.contains('stats-section')) {

                const counters = entry.target.querySelectorAll('.counter');
                const speed = 200;

                counters.forEach(counter => {

                    const target = +counter.dataset.target;

                    const updateCount = () => {

                        const count = +counter.innerText;
                        const increment = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 15);
                        } else {
                            counter.innerText = target;
                        }

                    };

                    updateCount();

                });

                observer.unobserve(entry.target);
            }

        });
    }, observerOptions);

    // Observa todos los elementos Reveal
    document.querySelectorAll('.reveal').forEach(el => {

        const rect = el.getBoundingClientRect();

        // Si el elemento ya es visible al cargar la página
        // (muy común en móviles), lo activamos inmediatamente.
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        } else {
            observer.observe(el);
        }

    });

    /* ==========================================================================
       3. MENÚ HAMBURGUESA
       ========================================================================== */
    if (menuToggle && navLinks) {

        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

    }

    /* ==========================================================================
       4. CERRAR MENÚ AL HACER CLICK FUERA
       ========================================================================== */
    document.addEventListener('click', (e) => {

        if (
            navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }

    });

});
