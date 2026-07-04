
(function() {
    'use strict';
    
    const stickyCta = document.getElementById('foundingMemberStickyCta');
    const hero = document.querySelector('.founding-member-hero');
    
    if (stickyCta && hero) {
        function checkScroll() {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;
            
            if (scrollPosition > heroBottom + 100) {
                stickyCta.classList.add('show');
            } else {
                stickyCta.classList.remove('show');
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {
                console.warn('Smooth scroll failed for href:', href, error);
            }
        });
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.lazy-load').forEach(img => {
            imageObserver.observe(img);
        });
    }
})();
