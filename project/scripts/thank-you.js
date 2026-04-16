const params = new URLSearchParams(window.location.search);
const resultsDiv = document.getElementById('results');

if (resultsDiv) {
  const fields = [
    'firstName',
    'lastName',
    'orgTitle',
    'email',
    'phone',
    'barangay',
    'role',
    'organization',
    'interests',
    'availability',
    'participation',
    'motivation',
    'skills',
    'timestamp'
  ];

  const formatLabel = (str) => {
    return str
      .replace(/([A-Z])/g, ' $1')   // split camelCase
      .replace(/^./, (c) => c.toUpperCase());
  };

  const formatValue = (key, value) => {
    if (!value) return '—';

    // optional: make timestamp readable
    if (key === 'timestamp') {
      const date = new Date(value);
      return date.toLocaleString();
    }

    return value;
  };

  resultsDiv.innerHTML = fields
    .map(f => {
      const label = formatLabel(f);
      const value = formatValue(f, params.get(f));
      return `<p><strong>${label}:</strong> ${value}</p>`;
    })
    .join('');
}