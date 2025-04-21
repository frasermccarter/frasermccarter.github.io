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

    const eventsContainer = document.querySelector('.events-container');
    const slides = document.querySelectorAll('.event-card');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    
    if (eventsContainer && slides.length > 0 && prevBtn && nextBtn) {
        let currentSlide = 0;
        
        // Initialize first slide
        slides[0].classList.add('active');
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                    slide.style.transform = 'translateX(0)';
                } else {
                    slide.classList.remove('active');
                    slide.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
                }
            });
        }
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        // Show initial slide
        showSlide(0);
    }
});
