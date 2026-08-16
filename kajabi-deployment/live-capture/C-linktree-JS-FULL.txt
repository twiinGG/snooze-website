document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.getElementById('snooze-linktree');
  if (!wrapper) return;

  // Card/tile entrance is pure CSS (see lt-fade-up in the stylesheet) so
  // content is never gated on JS running or on scroll position. This
  // script only handles the primary button's press feedback.
  const primary = wrapper.querySelector('[data-primary-link]');

  if (primary) {
    primary.addEventListener('click', () => {
      primary.classList.add('is-pressed');
      setTimeout(() => primary.classList.remove('is-pressed'), 220);
    });
  }
});
