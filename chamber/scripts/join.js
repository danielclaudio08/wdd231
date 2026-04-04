document.addEventListener("DOMContentLoaded", () => {
  // SET THE HIDDEN TIMESTAMP ON THE FORM PAGE
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    // Set current date/time when the form is loaded
    const now = new Date();
    const formattedTimestamp = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    timestampField.value = formattedTimestamp;
  }

  // DISPLAY SUBMITTED DATA ON THANK YOU PAGE
  const resultsDiv = document.querySelector('#results');
  if (resultsDiv) {
    const myInfo = new URLSearchParams(window.location.search);

    // The timestamp is always set by the form, so it will be present.
    const submittedTimestamp = myInfo.get('timestamp');

    resultsDiv.innerHTML = `
      <p><strong>First Name:</strong> ${myInfo.get('firstName')}</p>
      <p><strong>Last Name:</strong> ${myInfo.get('lastName')}</p>
      <p><strong>Organizational Title:</strong> ${myInfo.get('orgTitle')}</p>
      <p><strong>Email:</strong> ${myInfo.get('email')}</p>
      <p><strong>Mobile Phone:</strong> ${myInfo.get('phone')}</p>
      <p><strong>Business/Organization Name:</strong> ${myInfo.get('businessName')}</p>
      <p><strong>Membership Level:</strong> ${myInfo.get('membership')}</p>
      <p><strong>Business/Organization Description:</strong> ${myInfo.get('description')}</p>
      <p><strong>Submission Date:</strong> ${submittedTimestamp}</p>
    `;
  }

  // MODAL FUNCTIONALITY (only on join.html)
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