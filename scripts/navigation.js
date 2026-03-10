const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector(".links");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");

  menuButton.textContent =
    nav.classList.contains("open") ? "✖" : "☰";
});