document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const container = document.querySelector('.nav-container');
    const threshold = 100;

    function updateNavWidth() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        container.style.width = `min(1200px, calc(95% - ${scrollbarWidth}px))`;
    }

    function handleScroll() {
        if (window.scrollY > threshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavWidth);
    
    // Initial setup
    handleScroll();
    updateNavWidth();

    // Simple parallax effect
    document.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.section-image');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const rect = element.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (visible) {
                const yOffset = window.scrollY * speed;
                element.style.backgroundPositionY = `${yOffset}px`;
            }
        });
    });
});