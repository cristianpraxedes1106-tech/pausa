(() => {
  'use strict';

  const STORAGE_KEY = 'pausa.preferences';

  const getPreferences = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  };

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const preferences = getPreferences();
    const root = document.documentElement;

    if (preferences.reducedMotion) {
      root.classList.add('reduce-motion');
    }

    document.querySelectorAll('[data-set-reduced-motion]').forEach((control) => {
      control.addEventListener('click', () => {
        const nextValue = control.dataset.setReducedMotion === 'true';
        preferences.reducedMotion = nextValue;
        savePreferences(preferences);
        root.classList.toggle('reduce-motion', nextValue);
      });
    });
  });
})();
