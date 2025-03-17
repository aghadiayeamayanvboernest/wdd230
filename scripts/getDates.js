
// Get current year for the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date of the document   
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modification: " + lastModified;

const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');


hambutton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hambutton.classList.toggle('show');
  
});


const darkModeToggle = document.getElementById("darkModeToggle");
const modeIcon = document.getElementById("modeIcon");
const body = document.body;

// Check if dark mode was previously enabled
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    modeIcon.textContent = "☀️"; // Change to Sun icon
}

// Toggle dark mode on button click
darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        modeIcon.textContent = "🌙"; // Change to Moon icon
        localStorage.setItem("darkMode", "disabled");
    } else {
        body.classList.add("dark-mode");
        modeIcon.textContent = "☀️"; // Change to Sun icon
        localStorage.setItem("darkMode", "enabled");
    }
});

