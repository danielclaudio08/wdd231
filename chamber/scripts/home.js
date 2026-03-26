const apiKey = "bc461c0c3fc8d82813accc5432a9f98a";
const lat = "14.65";
const lon = "121.05";

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // ✅ SHOW DATA IN CONSOLE (REQUIRED)
    console.log("FULL WEATHER DATA:", data);

    // CURRENT WEATHER
    const current = data.list[0];

    console.log("CURRENT WEATHER OBJECT:", current); // 👈 important for rubric

    // ---------------- CURRENT WEATHER ----------------
    document.querySelector("#temp").innerHTML =
      `<strong>${current.main.temp.toFixed(1)}</strong>°C`;

    document.querySelector("#desc").textContent =
      current.weather[0].description;

    document.querySelector("#temp-min").textContent =
      `Min: ${current.main.temp_min.toFixed(1)}°C`;

    document.querySelector("#temp-max").textContent =
      `Max: ${current.main.temp_max.toFixed(1)}°C`;

    document.querySelector("#humid").textContent =
      `Humidity: ${current.main.humidity}%`;

    // ✅ CURRENT ICON ONLY (NOT forecast)
    const iconCode = current.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const iconImg = document.querySelector("#weather-icon");
    if (iconImg) {
      iconImg.src = iconURL;
      iconImg.alt = current.weather[0].description;
    }

    // ---------------- FORECAST (NO IMAGES) ----------------
    const forecastContainer = document.querySelector("#forecast");
    forecastContainer.innerHTML = "";

    const today = new Date();

    for (let i = 8; i <= 24; i += 8) {
      const day = data.list[i];
      const date = new Date(day.dt_txt);

      console.log("FORECAST DAY:", day);

      let label = date.toLocaleDateString("en-US", { weekday: "long" });

      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      if (isToday) {
        label = "Today";
      }

      const card = document.createElement("p");
      card.innerHTML = `${label} -&nbsp;<strong>${day.main.temp.toFixed(1)}°C</strong>`;

      forecastContainer.appendChild(card);
    }

  } catch (error) {
    console.error("Weather error:", error);
  }
}

// ---------------- SPOTLIGHTS ----------------
const membersURL = "data/members.json";

async function getSpotlights() {
  const response = await fetch(membersURL);
  const data = await response.json();

  const members = data.companies;

  // FILTER gold (3) & silver (2)
  const filtered = members.filter(
    m => m.membership === 2 || m.membership === 3
  );

  // RANDOMIZE
  const shuffled = filtered.sort(() => 0.5 - Math.random());

  const selected = shuffled.slice(0, 3);

  displaySpotlights(selected);
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
      <img src="${imgSrc}" alt="${member.name} logo" loading="lazy">
      <p class="address">${member.address}</p>
      <p class="phone">${member.phone}</p>
      <a href="${member.website}" target="_blank" class="url">${member.website}</a>
      <p class="membership"><strong>${level}</strong></p>
    `;

    container.appendChild(card);
  });
}

// RUN
getWeather();
getSpotlights();