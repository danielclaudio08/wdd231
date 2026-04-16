import { fun } from '../data/fun-eco.mjs';

const displayHere = document.querySelector('#fun-grid');
const messageBox = document.querySelector('#user-message');

/* ===== CREATE MODAL ===== */
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-content">
    <button class="close-modal" aria-label="Close modal">&times;</button>
    <div id="modal-body"></div>
  </div>
`;
document.body.appendChild(modal);

const modalBody = modal.querySelector('#modal-body');
const closeBtn = modal.querySelector('.close-modal');

/* close modal */
closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

/* ===== BUILD CARDS ===== */
function displayItems(data) {
  data.forEach((item) => {

    const card = document.createElement('div');
    card.classList.add('fun-card');

    /* image */
    const img = document.createElement('img');
    img.src = `images/${item.image || 'placeholder.jpg'}`;
    img.alt = item.title;
    img.loading = "lazy";

    /* title */
    const title = document.createElement('h2');
    title.textContent = item.title;

    /* environmental impact */
    const impact = document.createElement('p');
    impact.classList.add('impact');
    impact.textContent = item.environmental_impact;

    /* button */
    const btn = document.createElement('button');
    btn.textContent = "Learn More";

    btn.addEventListener('click', () => {
      openModal(item);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(impact);
    card.appendChild(btn);

    displayHere.appendChild(card);
  });
}

/* ===== MODAL CONTENT ===== */
function openModal(item) {
  modalBody.innerHTML = `
    <h2>${item.title}</h2>
    <p><strong>Description:</strong> ${item.description}</p>
    <p><strong>Date:</strong> ${item.date}</p>
    <p><strong>Location:</strong> ${item.location}</p>
    <p><strong>Duration:</strong> ${item.duration_hours} hours</p>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Materials Needed:</strong> ${item.materials_needed.join(', ')}</p>
  `;

  modal.classList.add('open');
}

displayItems(fun);

/* ===== VISITOR MESSAGE ===== */
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
  message = "Welcome! Let’s explore eco-friendly activities";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    message = "Back so soon! Great to see you again!";
  } else if (days === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${days} days ago.`;
  }
}

messageBox.textContent = message;
localStorage.setItem("lastVisit", now);