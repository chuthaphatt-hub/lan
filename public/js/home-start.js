// The landing page always starts at the hero when opened or refreshed.
function openAtHome() {
  history.scrollRestoration = 'manual';
  if (location.hash !== '#home') history.replaceState(null, '', `${location.pathname}${location.search}#home`);
  window.scrollTo(0, 0);
}

window.addEventListener('load', openAtHome, { once: true });
window.setTimeout(openAtHome, 0);
