/* ==========================================================================
   IWASEE 2026 - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initHeader();
    initReveal();
    initMobileMenu();
    initDropdowns();
    initHashNavigation();

});


/* ==========================================================================
   HEADER (SCROLL EFFECT)
   ========================================================================== */

function initHeader() {

    const header = document.getElementById("main-nav");

    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader);

}


/* ==========================================================================
   SCROLL REVEAL + ANIMATED COUNTERS
   ========================================================================== */

function initReveal() {

    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            // Counter animation
            if (entry.target.classList.contains("stats-section")) {

                const counters = entry.target.querySelectorAll(".counter");

                counters.forEach(counter => animateCounter(counter));

            }

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.10
    });

    revealElements.forEach(el => {

        const rect = el.getBoundingClientRect();

        // SOLUCIÓN PARA MÓVILES:
        // Si el elemento ya es visible al cargar la página,
        // se activa inmediatamente.

        if (rect.top < window.innerHeight) {
            el.classList.add("active");
        } else {
            observer.observe(el);
        }

    });

}


/* ==========================================================================
   COUNTER ANIMATION
   ========================================================================== */

function animateCounter(counter) {

    const target = Number(counter.dataset.target);

    if (isNaN(target)) return;

    const speed = 200;

    const update = () => {

        const current = Number(counter.innerText);

        const increment = target / speed;

        if (current < target) {

            counter.innerText = Math.ceil(current + increment);

            setTimeout(update, 15);

        } else {

            counter.innerText = target;

        }

    };

    update();

}


/* ==========================================================================
   MOBILE MENU
   ========================================================================== */

function initMobileMenu() {

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    document.addEventListener("click", (e) => {

        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            document.querySelectorAll(".dropdown-menu")
                .forEach(menu => menu.classList.remove("show-dropdown"));

        }

    });

}


/* ==========================================================================
   MOBILE DROPDOWNS
   ========================================================================== */

function initDropdowns() {

    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {

        toggle.addEventListener("click", function (e) {

            if (window.innerWidth > 992) return;

            e.preventDefault();
            e.stopPropagation();

            const menu = this.nextElementSibling;

            if (!menu) return;

            document.querySelectorAll(".dropdown-menu.show-dropdown")
                .forEach(item => {

                    if (item !== menu) {

                        item.classList.remove("show-dropdown");

                    }

                });

            menu.classList.toggle("show-dropdown");

        });

    });

}


/* ==========================================================================
   INFO.HTML - TABS
   ========================================================================== */

window.openInfoSection = function (evt, sectionName) {

    document.querySelectorAll(".tab-section").forEach(section => {

        section.style.display = "none";
        section.classList.remove("active");

    });

    document.querySelectorAll(".side-tab-btn")
        .forEach(btn => btn.classList.remove("active"));

    const target = document.getElementById(sectionName);

    if (target) {

        target.style.display = "block";

        setTimeout(() => {

            target.classList.add("active");

        }, 10);

    }

    if (evt) {

        evt.currentTarget.classList.add("active");

    }

};


/* ==========================================================================
   OPEN TAB FROM URL HASH
   ========================================================================== */

function initHashNavigation() {

    if (!window.location.hash) return;

    const targetId = window.location.hash.substring(1);

    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    if (!targetSection.classList.contains("tab-section")) return;

    const button = document.querySelector(
        `.side-tab-btn[onclick*="${targetId}"]`
    );

    if (!button) return;

    button.click();

    if (window.innerWidth <= 768) {

        setTimeout(() => {

            const content = document.querySelector(".content-area");

            if (!content) return;

            window.scrollTo({

                top: content.offsetTop - 100,
                behavior: "smooth"

            });

        }, 100);

    }

}
