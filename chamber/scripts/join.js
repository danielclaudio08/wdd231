document.addEventListener("DOMContentLoaded", () => {
  const resultsDiv = document.querySelector('#results');

  // Auto-fill timestamp on form submission
  const form = document.querySelector('.join-form');
  const timestampInput = document.querySelector('#timestamp');
  if (form && timestampInput) {
    form.addEventListener('submit', () => {
      timestampInput.value = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    });
  }

  // Display submitted form info and submission date on the thank-you page
  if (resultsDiv) {
    const myInfo = new URLSearchParams(window.location.search);
    const timestamp = myInfo.get('timestamp') || new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });

    resultsDiv.innerHTML = `
      <p><strong>First Name:</strong> ${myInfo.get('firstName') || 'N/A'}</p>
      <p><strong>Last Name:</strong> ${myInfo.get('lastName') || 'N/A'}</p>
      <p><strong>Organizational Title:</strong> ${myInfo.get('orgTitle') || 'N/A'}</p>
      <p><strong>Email:</strong> ${myInfo.get('email') || 'N/A'}</p>
      <p><strong>Mobile Phone:</strong> ${myInfo.get('phone') || 'N/A'}</p>
      <p><strong>Business/Organization Name:</strong> ${myInfo.get('businessName') || 'N/A'}</p>
      <p><strong>Membership Level:</strong> ${myInfo.get('membership') || 'N/A'}</p>
      <p><strong>Business/Organization Description:</strong> ${myInfo.get('description') || 'N/A'}</p>
      <p><strong>Submission Date:</strong> ${timestamp}</p>
    `;
  }

  // Modal buttons (exist on join.html)
  const openButtons = document.querySelectorAll(".open-modal");
  const dialogs = document.querySelectorAll("dialog");

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const dialog = document.getElementById(targetId);
      if (dialog) dialog.showModal();
    });
  });

  dialogs.forEach(dialog => {
    const closeBtn = dialog.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => dialog.close());
    }
  });
});