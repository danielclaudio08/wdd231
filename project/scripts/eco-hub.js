/* ===== FETCH & RENDER ORGANIZATIONS ===== */
const path = "data/organization.json";
const container = document.querySelector("#volunteers");

async function getOrganizations() {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("Cannot load organization.json");
    }

    const data = await response.json();
    displayOrganizations(data.organizations);

  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getOrganizations();

/* ===== RENDER CARDS ===== */
function displayOrganizations(orgs) {
  container.innerHTML = "";

  orgs.forEach(org => {
    const card = document.createElement("section");

    card.classList.add("org-card");

    card.innerHTML = `
      <img src="images/${org.image}" alt="${org.name}" loading="lazy">
      <h2>${org.name}</h2>
      <p class="desc">${org.description}</p>
      <p>📍 ${org.address}</p>
      <p>📞 ${org.phone}</p>
      <p>${org.email}</p>
    `;

    container.appendChild(card);
  });
}

/* ===== GRID / LIST TOGGLE ===== */
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

container.classList.add("grid");

gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});

/* ===== WEATHER ===== */
const tempElement = document.querySelector("#temp");
const descElement = document.querySelector("#desc");
const tempMinElement = document.querySelector("#temp-min");
const tempMaxElement = document.querySelector("#temp-max");
const humidElement = document.querySelector("#humid");
const weatherIcon = document.querySelector("#weather-icon");
const forecastList = document.querySelector("#forecast-list");

const myKey = "bc461c0c3fc8d82813accc5432a9f98a";
const myLat = "14.65";
const myLong = "121.05";

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(await response.text());

    const data = await response.json();
    displayResults(data);

  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  const current = data.list[0];

  tempElement.textContent = `${current.main.temp.toFixed(1)}°C`;
  descElement.textContent = current.weather[0].description;
  tempMinElement.textContent = `Min: ${current.main.temp_min.toFixed(1)}°C`;
  tempMaxElement.textContent = `Max: ${current.main.temp_max.toFixed(1)}°C`;
  humidElement.textContent = `Humidity: ${current.main.humidity}%`;

  const iconCode = current.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = current.weather[0].description;

  forecastList.innerHTML = "";

  const today = new Date();

  for (let i = 8; i <= 24; i += 8) {
    const day = data.list[i];
    if (!day) continue;

    const date = new Date(day.dt_txt);

    const isToday =
      date.toDateString() === today.toDateString();

    const label = isToday
      ? "Today"
      : date.toLocaleDateString("en-US", { weekday: "long" });

    const item = document.createElement("li");
    item.innerHTML = `${label}: ${day.weather[0].description} – <strong>${day.main.temp.toFixed(1)}°C</strong>`;

    forecastList.appendChild(item);
  }
}

apiFetch();