const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector(".links");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");

  menuButton.textContent =
    nav.classList.contains("open") ? "✖" : "☰";
});

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".links a");

navLinks.forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});