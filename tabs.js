document.querySelectorAll('[data-tabs]').forEach((group) => {
  const buttons = group.querySelectorAll('[data-tab-target]');
  const panels = group.querySelectorAll('[data-tab-panel]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab-target');
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      button.classList.add('active');
      group.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
    });
  });
});
