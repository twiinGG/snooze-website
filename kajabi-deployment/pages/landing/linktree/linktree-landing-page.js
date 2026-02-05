document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.getElementById('snooze-linktree');
  if (!wrapper) return;

  const cards = Array.from(wrapper.querySelectorAll('.lt-card, .lt-tile'));
  const primary = wrapper.querySelector('[data-primary-link]');

  const reveal = (card, index) => {
    setTimeout(() => {
      card.classList.add('is-visible');
    }, index * 80);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target);
            reveal(entry.target, index >= 0 ? index : 0);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach((card, index) => reveal(card, index));
  }

  if (primary) {
    primary.addEventListener('click', () => {
      primary.classList.add('is-pressed');
      setTimeout(() => primary.classList.remove('is-pressed'), 220);
    });
  }
});
