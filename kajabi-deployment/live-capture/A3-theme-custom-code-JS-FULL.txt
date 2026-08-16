
  document.addEventListener('DOMContentLoaded', function() {

  // Scope all selectors to the Home V2 wrapper so global injection is safe
  const wrapper = document.getElementById('home-page');
  if (!wrapper) return; // Exit if wrapper not found

  // 1. AGE & STAGE TABS LOGIC
  const ageBtns = wrapper.querySelectorAll('.age-btn');
  const ageContents = wrapper.querySelectorAll('.age-content');

  if(ageBtns.length > 0) {
    ageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        ageBtns.forEach(b => { b.classList.remove('active'); });
        ageContents.forEach(c => { c.classList.remove('active'); });

        // Add active to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const targetId = btn.getAttribute('data-age');
        const targetContent = document.getElementById(targetId);
        if(targetContent) {
           targetContent.classList.add('active');
        }
      });
    });
  }

  // 2. FAQ ACCORDION LOGIC
  const faqs = wrapper.querySelectorAll('.faq-head');
  
  faqs.forEach(head => {
    head.addEventListener('click', () => {
      const body = head.nextElementSibling;
      const icon = head.querySelector('i');
      if (!body) return;
      
      // Close other open items (cleaner, more premium)
      faqs.forEach(otherHead => {
        if (otherHead === head) return;
        const otherBody = otherHead.nextElementSibling;
        const otherIcon = otherHead.querySelector('i');
        if (otherBody && otherBody.classList.contains('open')) {
          otherBody.style.maxHeight = null;
          otherBody.classList.remove('open');
        }
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      // Toggle current
      if(body.style.maxHeight) {
        body.style.maxHeight = null;
        body.classList.remove('open');
        icon.style.transform = 'rotate(0deg)';
      } else {
        body.style.maxHeight = body.scrollHeight + "px";
        body.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // 3. STICKY BAR SCROLL LOGIC
  const stickyBar = wrapper.querySelector('#sticky-bar');
  const pricingSection = wrapper.querySelector('#pricing');
  
  if(stickyBar && pricingSection) {
    window.addEventListener('scroll', () => {
      const pricingTop = pricingSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Show sticky bar if scrolled past 600px AND pricing section is NOT in view
      if (scrollY > 600 && pricingTop > windowHeight) {
        stickyBar.classList.add('visible');
        document.body.classList.add('sticky-cta-visible');
      } else {
        stickyBar.classList.remove('visible');
        document.body.classList.remove('sticky-cta-visible');
      }
    });
  }

  // 4. SMOOTH SCROLL ANCHOR LINKS (scoped to wrapper)
  wrapper.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;

      const target = wrapper.querySelector(targetId);
      if(target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. TESTIMONIAL CAROUSEL AUTO-SCROLL
  const carouselInner = wrapper.querySelector('.carousel-inner-full');
  if(carouselInner) {
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    let isScrolling = false;
    
    function autoScroll() {
      if(isScrolling) return;
      
      const maxScroll = carouselInner.scrollWidth - carouselInner.clientWidth;
      if(scrollPosition >= maxScroll) {
        scrollPosition = 0; // Reset to start
      } else {
        scrollPosition += scrollSpeed;
      }
      
      carouselInner.scrollLeft = scrollPosition;
      requestAnimationFrame(autoScroll);
    }
    
    // Pause on hover
    carouselInner.addEventListener('mouseenter', () => { isScrolling = true; });
    carouselInner.addEventListener('mouseleave', () => { isScrolling = false; autoScroll(); });
    
    // Start auto-scroll
    autoScroll();
  }

});
