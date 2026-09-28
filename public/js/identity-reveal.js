(() => {
  const cards = [...document.querySelectorAll('.identity-cards article')];
  if (!cards.length) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }

  let timers = [];
  const clearTimers = () => {
    timers.forEach(window.clearTimeout);
    timers = [];
  };
  const reveal = () => {
    clearTimers();
    cards.forEach(card => card.classList.remove('is-visible'));
    timers = cards.map((card, index) => window.setTimeout(() => {
      card.classList.add('is-visible');
    }, index * 900));
  };

  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (entry.isIntersecting) reveal();
    else {
      clearTimers();
      cards.forEach(card => card.classList.remove('is-visible'));
    }
  }, { threshold: 0.15 });

  observer.observe(document.querySelector('#identities'));
})();
