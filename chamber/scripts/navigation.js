/* MOBILE MENU TOGGLE */
const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector(".links");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "✖" : "☰";
});

/* ACTIVE NAV LINK */
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".links a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* DARK MODE */
const darkBtn = document.querySelector("#dark-mode");
const icon = document.querySelector("#dark-icon");

const isDirectoryPage = window.location.pathname.includes("directory.html");

function applyDarkMode() {
  if (isDirectoryPage) {
    localStorage.removeItem("mode");
    document.documentElement.classList.remove("dark");
    if (icon) icon.src = "images/dark-mode.svg";
  } else {
    const savedMode = localStorage.getItem("mode");

    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      if (icon) icon.src = "images/light-mode.svg";
    } else {
      document.documentElement.classList.remove("dark");
      if (icon) icon.src = "images/dark-mode.svg";
    }
  }
}

applyDarkMode();

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");

    if (icon) {
      icon.src = isDark ? "images/light-mode.svg" : "images/dark-mode.svg";
    }

    localStorage.setItem("mode", isDark ? "dark" : "light");
  });
}