/* FETCH & RENDER MEMBERS */
const url = "data/companies.json";
const container = document.querySelector("#companies");

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.companies);
}

getMembers();

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");

    card.innerHTML = `
      <h2>${member.name}</h2>
      <img src="images/${member.image}" alt="${member.name}">
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <p class="url">
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">
          ${member.name}
        </a>
      </p>
    `;

    container.appendChild(card);
  });
}

/* GRID / LIST TOGGLE */
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

/* Default view */
container.classList.add("grid");
gridBtn.classList.add("active");

/* Grid view */
gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");

  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

/* List view */
listBtn.addEventListener("click", showList);

function showList() {
  container.classList.add("list");
  container.classList.remove("grid");

  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
}