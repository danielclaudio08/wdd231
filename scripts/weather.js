// Select HTML elements
const tempElement = document.querySelector('#temp');
const descElement = document.querySelector('#desc');
const tempMinElement = document.querySelector('#temp-min');
const tempMaxElement = document.querySelector('#temp-max');
const humidElement = document.querySelector('#humid');
const weatherIcon = document.querySelector('#weather-icon');
const forecastList = document.querySelector('#forecast-list');

// API variables
const myKey = "bc461c0c3fc8d82813accc5432a9f98a";
const myLat = "14.65";
const myLong = "121.05";

// API URL with metric units
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // For testing
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  // Current weather (first item)
  const current = data.list[0];

  tempElement.innerHTML = `<strong>${current.main.temp.toFixed(1)}</strong>°C`;
  descElement.textContent = current.weather[0].description;
  tempMinElement.textContent = `Min: ${current.main.temp_min.toFixed(1)}°C`;
  tempMaxElement.textContent = `Max: ${current.main.temp_max.toFixed(1)}°C`;
  humidElement.textContent = `Humidity: ${current.main.humidity}%`;

  // Weather icon – use high-resolution @2x version
  const iconCode = current.weather[0].icon;
  const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;
  weatherIcon.src = iconURL;
  weatherIcon.alt = current.weather[0].description;
  weatherIcon.setAttribute('crossorigin', 'anonymous');

  // Forecast (next 3 days at 12:00)
  forecastList.innerHTML = "";
  const today = new Date();

  for (let i = 8; i <= 24; i += 8) {
    const day = data.list[i];
    if (!day) continue;
    const date = new Date(day.dt_txt);
    let label = date.toLocaleDateString("en-US", { weekday: "long" });

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) label = "Today";

    const description = day.weather[0].description;
    const temp = day.main.temp.toFixed(1);
    const listItem = document.createElement("li");
    listItem.innerHTML = `${label}: ${description} – <strong>${temp}°C</strong>`;
    forecastList.appendChild(listItem);
  }
}

apiFetch();

// ---------------- SPOTLIGHTS ----------------
const membersURL = "data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);
    const data = await response.json();
    const members = data.companies;

    // Filter gold (3) & silver (2)
    const filtered = members.filter(m => m.membership === 2 || m.membership === 3);
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    displaySpotlights(selected);
  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

function displaySpotlights(members) {
  const container = document.querySelector("#spotlight-container");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    const level = member.membership === 3 ? "Gold Member 3️⃣" : "Silver Member 2️⃣";
    const imgSrc = member.image ? `images/${member.image}` : "images/placeholder.jpg";

    card.innerHTML = `
      <h2>${member.name}</h2>
      <img src="${imgSrc}" alt="${member.name} logo">
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <a href="${member.website}" target="_blank" class="url">${member.website}</a>
      <p class="membership"><strong>${level}</strong></p>
    `;

    container.appendChild(card);
  });
}

getSpotlights();