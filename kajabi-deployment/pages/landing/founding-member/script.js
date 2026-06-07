// Founding Member Offer Landing Page JavaScript
// Add this to the page's Custom Script block in Kajabi

(function() {
    'use strict';
    
    // Sticky CTA functionality
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
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip empty or invalid anchors (just "#" or "#!")
            if (!href || href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            // Validate href is a valid CSS selector before using querySelector
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
                // If querySelector fails (invalid selector), let the link navigate normally
                console.warn('Smooth scroll failed for href:', href, error);
            }
        });
    });
    
    // Performance: Lazy load images (if any are added later)
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
