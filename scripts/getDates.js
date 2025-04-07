
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


// Select the element where the visit count will be displayed
const visitCountElement = document.getElementById("visit-count");

// Check if the 'pageVisits' key exists in localStorage
let visitCount = localStorage.getItem("pageVisits");

// If it doesn't exist, initialize it to 0
if (!visitCount) {
    visitCount = 0;
}

// Increment the visit count
visitCount++;

// Update the visit count in localStorage
localStorage.setItem("pageVisits", visitCount);

// Display the visit count on the page
visitCountElement.textContent = visitCount;



// Weather API Function for Benin City
async function getWeather() {
    const apiKey = 'fcb9c4b2ba563009b0f04f129f01e52d'; // 🔑 
    const city = 'Benin City,NG';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log("Weather Data:", data); // Debug log
      displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      const weatherCard = document.querySelector('.weather-card');
      if (weatherCard) {
        weatherCard.innerHTML = `
          <h2>Weather Unavailable</h2>
          <p>${error.message || "Service temporarily down"}</p>
        `;
      }
    }
  }
  
  function displayWeather(data) {
    const temperature = document.querySelector('#temperature');
    const description = document.querySelector('#weather-description');
    const humidity = document.querySelector('#humidity');
    const icon = document.querySelector('#weather-icon');
    const windSpeed = document.querySelector('#wind-speed');
    
    // Ensure data is available
    if (data.main && data.weather && data.wind) {
      temperature.textContent = Math.round(data.main.temp);
      description.textContent = data.weather[0].description;
      humidity.textContent = data.main.humidity;
      windSpeed.textContent = data.wind.speed;
    
      // Set weather icon (corrected base URL)
      const iconUrl = `https://openweathermap.org/img/w/10d.png`;
      icon.setAttribute('src', iconUrl);
      icon.setAttribute('alt', data.weather[0].description);
    
      // Update city name display
      const cityNameElement = document.querySelector('#city-name');
      if (cityNameElement) {
        cityNameElement.textContent = data.name;
      }
    } else {
      console.error("Weather data is incomplete.");
      document.querySelector('.weather-card').innerHTML = `
        <h2>Weather Unavailable</h2>
        <p>Incomplete weather data received.</p>
      `;
    }
  }
  
  // Call the function when page loads
  window.addEventListener('load', getWeather);
  
  // Refresh weather every 30 minutes
  setInterval(getWeather, 1800000);
  

