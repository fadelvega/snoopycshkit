document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Animación "Fade-in" al hacer scroll ---
    // Esta es la animación profesional que pediste
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Observa en relación al viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- 2. Navegación Suave (Smooth Scroll) ---
    // Para los enlaces del menú: #problema, #solucion, etc.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el salto brusco

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Alinea al inicio del elemento
                });
            }
        });
    });

});