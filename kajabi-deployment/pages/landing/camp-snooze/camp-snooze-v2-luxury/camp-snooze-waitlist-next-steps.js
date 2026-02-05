/* ============================================
   CAMP SNOOZE WAITLIST - NEXT STEPS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.waitlist-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 150 * index);
  });
});
