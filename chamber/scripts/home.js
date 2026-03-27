// ===== DOM ELEMENTS =====
const tempElement = document.querySelector('#temp');
const descElement = document.querySelector('#desc');
const tempMinElement = document.querySelector('#temp-min');
const tempMaxElement = document.querySelector('#temp-max');
const humidElement = document.querySelector('#humid');
const weatherIcon = document.querySelector('#weather-icon');
const forecastList = document.querySelector('#forecast-list');

// ===== API SETTINGS =====
const myKey = "bc461c0c3fc8d82813accc5432a9f98a";
const myLat = "14.65";
const myLong = "121.05";

// Forecast API (includes current + future data)
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;

// ===== FETCH WEATHER DATA =====
async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data); // 🔍 check API data in console
      displayResults(data);
    } else {
      throw Error(await response.text());
    }

  } catch (error) {
    console.log(error);
  }
}

// ===== DISPLAY WEATHER =====
function displayResults(data) {

  // --- CURRENT WEATHER ---
  const current = data.list[0];

  tempElement.innerHTML = `<strong>${current.main.temp.toFixed(1)}</strong>°C`;
  descElement.textContent = current.weather[0].description;
  tempMinElement.textContent = `Min: ${current.main.temp_min.toFixed(1)}°C`;
  tempMaxElement.textContent = `Max: ${current.main.temp_max.toFixed(1)}°C`;
  humidElement.textContent = `Humidity: ${current.main.humidity}%`;

  // --- WEATHER ICON (HIGH RESOLUTION FIX) ---
  const iconCode = current.weather[0].icon;

  // Use @2x to avoid blurry image
  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIcon.src = iconURL;
  weatherIcon.alt = current.weather[0].description;

  // Support retina screens
  weatherIcon.srcset = `
    https://openweathermap.org/img/wn/${iconCode}.png 1x,
    https://openweathermap.org/img/wn/${iconCode}@2x.png 2x
  `;

  weatherIcon.setAttribute('crossorigin', 'anonymous');

  // --- 3-DAY FORECAST ---
  forecastList.innerHTML = "";
  const today = new Date();

  for (let i = 8; i <= 24; i += 8) {

    const day = data.list[i];
    if (!day) continue;

    const date = new Date(day.dt_txt);

    let label = date.toLocaleDateString("en-US", { weekday: "long" });

    // Rename current day label
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

// ===== SPOTLIGHTS SECTION =====
const membersURL = "data/members.json";

// Fetch spotlight members
async function getSpotlights() {
  try {
    const response = await fetch(membersURL);
    const data = await response.json();

    const members = data.companies;

    // Filter: only Silver (2) & Gold (3)
    const filtered = members.filter(m => m.membership === 2 || m.membership === 3);

    // Shuffle + pick 3 random
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    displaySpotlights(selected);

  } catch (error) {
    console.error("Spotlight error:", error);
  }
}

// Display spotlight cards
function displaySpotlights(members) {

  const container = document.querySelector("#spotlight-container");
  container.innerHTML = "";

  members.forEach(member => {

    const card = document.createElement("section");

    // Membership label
    const level = member.membership === 3
      ? "Gold Member 3️⃣"
      : "Silver Member 2️⃣";

    // Fallback image if none exists
    const imgSrc = member.image
      ? `images/${member.image}`
      : "images/placeholder.jpg";

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