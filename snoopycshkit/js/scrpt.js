document.addEventListener('DOMContentLoaded', () => {
    
    // --- Cargar la historia del proyecto desde JSON (Sin cambios) ---
    const loadProjectStory = async () => {
        try {
            const response = await fetch('data/project.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const storyContainer = document.getElementById('project-story-content');
            if (storyContainer) {
                storyContainer.innerHTML = ''; // Limpiar contenido previo
                data.projectStory.forEach(item => {
                    const titleElement = document.createElement('h3');
                    titleElement.textContent = item.title;
                    const paragraphElement = document.createElement('p');
                    paragraphElement.textContent = item.paragraph;
                    storyContainer.appendChild(titleElement);
                    storyContainer.appendChild(paragraphElement);
                });
            }
        } catch (error) {
            console.error('Error al cargar la historia del proyecto:', error);
            const storyContainer = document.getElementById('project-story-content');
            if (storyContainer) {
                storyContainer.textContent = 'Lo sentimos, no pudimos cargar la historia del proyecto en este momento.';
            }
        }
    };

    // Llama a la función para cargar la historia
    loadProjectStory();

    // --- Navegación suave para los enlaces (Sin cambios) ---
    document.querySelectorAll('header nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Desplazamiento suave para el botón CTA (Sin cambios) ---
    const ctaButton = document.querySelector('.call-to-action');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- NUEVO: Animación de "Fade-in" al hacer scroll ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // usa el viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento debe estar visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que es visible
            }
        });
    }, observerOptions);

    // Observar cada elemento
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

});
