const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector(".links");

// Function to update the icon
function updateMenuIcon() {
  menuButton.textContent = nav.classList.contains('open') ? 'X' : '☰';
}

// Event listener
menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");  // Open/close menu
  updateMenuIcon();               // Update the button icon
});