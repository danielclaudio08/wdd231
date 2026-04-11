import { places } from '../data/places.mjs';

const displayHere = document.querySelector('#discover-grid');
const messageBox = document.querySelector('#visitor-message');

const links = [
  "https://quezoncity.gov.ph/place/quezon-memorial-circle/",
  "https://quezoncity.gov.ph/place/ninoy-aquino-parks-and-wildlife-center/",
  "https://quezoncity.gov.ph/place/la-mesa-eco-park/",
  "https://qcpl.quezoncity.gov.ph/article/p0dpurpscoqaz4agdffagnq5",
  "https://www.mysterymanila.com/branch/eastwood/",
  "https://www.tripadvisor.com.ph/Attraction_Review-g298574-d27934729-Reviews-SuperPark_Philippines-Quezon_City_Metro_Manila_Luzon.html",
  "https://quezoncity.gov.ph/place/maginhawa-food-area/",
  "https://upd.edu.ph/"
];

/* ===== BUILD CARDS ===== */
function displayItems(places) {
  places.forEach((x, index) => {

    const mycard = document.createElement('div');
    mycard.classList.add('card');

    // title
    const mytitle = document.createElement('h2');
    mytitle.textContent = x.name;

    // figure + image
    const figure = document.createElement('figure');
    const myphoto = document.createElement('img');
    myphoto.src = `images/${x["photo-url"]}`;
    myphoto.alt = x.name;
    myphoto.loading = "lazy";
    figure.appendChild(myphoto);

    // address
    const myaddress = document.createElement('address');
    myaddress.textContent = x.address;

    // description
    const mydesc = document.createElement('p');
    mydesc.textContent = x.description;

    // button
    const btn = document.createElement('button');
    btn.textContent = "Learn More";

    btn.addEventListener('click', () => {
      window.open(links[index], '_blank');
    });

    // append all
    mycard.appendChild(mytitle);
    mycard.appendChild(figure);
    mycard.appendChild(myaddress);
    mycard.appendChild(mydesc);
    mycard.appendChild(btn);

    displayHere.appendChild(mycard);
  });
}

displayItems(places);

/* ===== LOCAL STORAGE VISIT MESSAGE ===== */
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    message = "Back so soon! Awesome!";
  } else if (days === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${days} days ago.`;
  }
}

messageBox.textContent = message;
localStorage.setItem("lastVisit", now);