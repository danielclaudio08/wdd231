document.addEventListener('DOMContentLoaded', () => {
  const tsField = document.getElementById('timestamp');
  const form = document.querySelector('.join-form');

  // Set timestamp
  if (tsField) {
    tsField.value = new Date().toLocaleString();
  }

  if (!form) return;

  // Restore saved draft (if exists)
  const saved = localStorage.getItem('membershipDraft');

  if (saved) {
    const restore = confirm('Restore your last incomplete application?');
    if (restore) {
      try {
        const data = JSON.parse(saved);

        Object.entries(data).forEach(([key, val]) => {
          const input = form.querySelector(`[name="${key}"]`);
          if (input) input.value = val;
        });
      } catch (e) {
        console.warn('Invalid saved form data, clearing...');
        localStorage.removeItem('membershipDraft');
      }
    }
  }

  // Save draft on input
  form.addEventListener('input', () => {
    const formData = new FormData(form);
    const draft = Object.fromEntries(formData.entries());
    localStorage.setItem('membershipDraft', JSON.stringify(draft));
  });
});