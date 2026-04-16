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