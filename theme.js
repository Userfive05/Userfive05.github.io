(() => {
  let theme;
  try { theme = localStorage.getItem('project-journal-theme'); } catch (_) {}
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = (value) => {
    document.documentElement.dataset.theme = value;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.hidden = false;
      button.textContent = value === 'dark' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-pressed', String(value === 'dark'));
      button.setAttribute('aria-label', 'Dark mode');
    }
  };
  apply(theme === 'dark' || theme === 'light' ? theme : preference.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.querySelector('.theme-toggle').addEventListener('click', () => {
      theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      try { localStorage.setItem('project-journal-theme', theme); } catch (_) {}
    });
  });
  preference.addEventListener('change', (event) => { if (!theme) apply(event.matches ? 'dark' : 'light'); });
})();
