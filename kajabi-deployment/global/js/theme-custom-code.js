/* ===========================================================================
   theme-custom-code.js — Website theme Custom Code JS
   ---------------------------------------------------------------------------
   PASTE TARGET: Customizer -> Theme Custom Code -> JS  (`settings-js-input`)
   SCOPE:        Website pages ONLY (website theme 2156873377).
                 Landing pages, checkouts and thank-you pages each have their
                 OWN theme and do NOT inherit this field.
   PASTE RULE:   Whole-field overwrite. Bare JavaScript only.

   THIS FIELD TAKES JAVASCRIPT, NOT HTML. No <script>, no <link>.
   GTM / Stape, the schema.org JSON-LD, the currency toggle and the
   `[data-checkout]` / SNOOZE_CHECKOUT_URL helpers all live in the SITE-WIDE
   field instead: Settings -> Site Details -> Header Page Scripts, canonical
   file `global/html/site-header-page-scripts.html`.

   Do NOT merge that file into this one. On 2026-07-27 a consolidation did
   exactly that and left this file at 62,708 chars against 4,326 chars live,
   92% of it duplicating the header file. Pasting it would have been a JS
   syntax error AND a second GTM instance double-firing on every website page.
   Pre-split copy kept at `_archive/theme-custom-code.js.pre-split-2026-07-27`.

   Surface map: docs/technical/KAJABI-SURFACE-CODE-SETUP.md
   =========================================================================== */

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
