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

(function() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    const nav = document.querySelector('nav');
    let isMobile = () => window.matchMedia('(max-width: 600px)').matches;

    function onScroll() {
        if (!isMobile()) {
            nav.style.transform = '';
            nav.style.transition = '';
            return;
        }
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                if (currentScrollY > lastScrollY && currentScrollY > 40) {
                    // Scrolling down
                    nav.style.transform = 'translateY(-120%)';
                    nav.style.transition = 'transform 0.3s';
                } else {
                    // Scrolling up
                    nav.style.transform = 'translateY(0)';
                    nav.style.transition = 'transform 0.3s';
                }
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            nav.style.transform = '';
            nav.style.transition = '';
        }
    });
})();