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

const darkBtn = document.querySelector("#dark-mode");
const icon = document.querySelector("#dark-icon");

// Always start in light mode on every page
document.documentElement.classList.remove("dark");
if (icon) icon.src = "images/dark-mode.svg";

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    // Toggle dark mode only on the current page
    const isDark = document.documentElement.classList.toggle("dark");
    if (icon) {
      icon.src = isDark ? "images/light-mode.svg" : "images/dark-mode.svg";
    }
    // No localStorage – preference is not saved
  });
}