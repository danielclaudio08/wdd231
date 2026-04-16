import { initiatives } from '../data/initiative.mjs';

const container = document.querySelector("#spotlight-container");

function displayMembers(members) {
  container.innerHTML = "";

  // ✅ Sort: active first, inactive last
  const sortedMembers = [...members].sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "active") return -1;
    return 1;
  });

  sortedMembers.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    const statusText =
      member.status === "active" ? "Active 🟢" : "Not Active 🔴";

    card.innerHTML = `
      <h3 class="org-name">${member.name}</h3>
      <img class="org-img" src="images/${member.image}" alt="${member.name}" loading="lazy">
      <div class="org-details">
        <p><span class="label">Mission:</span> ${member.mission}</p>
        <p><span class="label">Address:</span> ${member.address}</p>
        <p><span class="label">Phone:</span> ${member.phone}</p>
        <p><span class="label">Status:</span> ${statusText}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `;

    container.appendChild(card);
  });
}

displayMembers(initiatives);