document.addEventListener("DOMContentLoaded", () => {
  const resultsDiv = document.querySelector('#results');

  // Only populate #results if it exists (i.e., on thankyou.html)
  if (resultsDiv) {
    const myInfo = new URLSearchParams(window.location.search);
    console.log(myInfo);

    resultsDiv.innerHTML = `
      <p><strong>First Name:</strong> ${myInfo.get('firstName') || 'N/A'}</p>
      <p><strong>Last Name:</strong> ${myInfo.get('lastName') || 'N/A'}</p>
      <p><strong>Organizational Title:</strong> ${myInfo.get('orgTitle') || 'N/A'}</p>
      <p><strong>Email:</strong> ${myInfo.get('email') || 'N/A'}</p>
      <p><strong>Mobile Phone:</strong> ${myInfo.get('phone') || 'N/A'}</p>
      <p><strong>Business/Organization Name:</strong> ${myInfo.get('businessName') || 'N/A'}</p>
      <p><strong>Membership Level:</strong> ${myInfo.get('membership') || 'N/A'}</p>
      <p><strong>Business/Organization Description:</strong> ${myInfo.get('description') || 'N/A'}</p>
      <p><strong>Submission Date:</strong> ${myInfo.get('timestamp') || new Date().toLocaleString()}</p>
    `;

    // Update hidden timestamp field if it exists
    const tsField = document.getElementById("timestamp");
    if (tsField) tsField.value = new Date().toISOString();
  }

  // Modal buttons (these exist on join.html, safe to run here)
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