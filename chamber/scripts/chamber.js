// Update the current year in the footer
const currentYearElement = document.getElementById("currentyear");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Update the last modified date in the footer
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = document.lastModified;
}

const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');


hambutton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hambutton.classList.toggle('show');
  
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    // Remove the active class from the current slide
    slides[currentSlide].classList.remove('active');

    // Increment the slide index
    currentSlide = (currentSlide + 1) % slides.length;

    // Add the active class to the next slide
    slides[currentSlide].classList.add('active');
}

// Change slides every 7 seconds
setInterval(showNextSlide, 7000);
// for the reveal on scroll effect


const events = [
    {
      date: "Jun 15th",
      name: "Business Networking",
      image: "images/event1.webp",
      link: "event.html" // Add a link to the event page
    },
    {
      date: "May 10th",
      name: "Local Market Fair",
      image: "images/event2.webp",
      link: "event.html"
    },
    {
      date: "Oct 5th",
      name: "Entrepreneurs Meetup",
      image: "images/event3.webp",
      link: "event.html"
    },
    {
      date: "Mar 31st",
      name: "Tech Innovation Showcase",
      image: "images/event4.webp",
      link: "event.html"
    },
    {
      date: "Apr 20th",
      name: "Women in Business Summit",
      image: "images/event5.webp",
      link: "event.html"
    },
    {
      date: "May 3rd",
      name: "Youth Enterprise Forum",
      image: "images/event6.webp",
      link: "event.html"
    }
  ];
  
// Select the event grid container
const eventGrid = document.querySelector(".event-grid");

// Dynamically create event cards
events.forEach(event => {
    // Create the anchor element
    const eventCard = document.createElement("a");
    eventCard.classList.add("event-item");
    eventCard.href = event.link; // Set the link to the event page

    // Add the event card content
    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.name}">
        <div class="event-details">
            <p class="event-date">${event.date}</p>
            <h3 class="event-name">${event.name}</h3>
        </div>
    `;

    // Append the event card to the grid
    eventGrid.appendChild(eventCard);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("meet-banner");
    const closeBtn = document.getElementById("close-banner");
    const day = new Date().getDay(); // 1 = Monday, 2 = Tuesday, 3 = Wednesday
  
    if (day >= 1 && day <= 3) {
      banner.classList.add("slide-in");
      banner.style.display = "block";
    }
  
    closeBtn.addEventListener("click", () => {
      banner.style.display = "none";
    });
  });


  
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
  // Ensure data is available
  if (data.main && data.weather && data.wind) {
    temperature.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;
  
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


// function to fetch and display 3-day forecast
// API Configuration
const apiKey = "fcb9c4b2ba563009b0f04f129f01e52d";
const city = "Benin City";
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// DOM Elements
const forecastList = document.getElementById('forecast');
const visitCounter = document.getElementById('visit-counter');

// Track Page Visits
function updateVisitCounter() {
  let visits = localStorage.getItem('pageVisits');
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem('pageVisits', visits);
  visitCounter.textContent = visits;
}

// Fetch 3-Day Forecast from OpenWeatherMap API
async function fetchForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error('Weather data not available');
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    forecastList.innerHTML = `<li>Error loading forecast: ${error.message}</li>`;
    console.error('Forecast fetch error:', error);
  }
}

// Display the 3-Day Forecast
function displayForecast(forecastData) {
  // Group forecasts by day
  const dailyForecasts = {};
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!dailyForecasts[dayKey]) {
      dailyForecasts[dayKey] = {
        date: date,
        temps: [],
        conditions: [],
        icons: []
      };
    }
    
    dailyForecasts[dayKey].temps.push(item.main.temp);
    dailyForecasts[dayKey].conditions.push(item.weather[0].main);
    dailyForecasts[dayKey].icons.push(item.weather[0].icon);
  });

  // Get next 3 days (skip today)
  const forecastDays = Object.keys(dailyForecasts).slice(1, 4);
  
  // Clear previous forecast
  forecastList.innerHTML = '';

  // Create forecast items
  forecastDays.forEach(day => {
    const dayData = dailyForecasts[day];
    const avgTemp = Math.round(dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length);
    const mostCommonCondition = getMostCommon(dayData.conditions);
    const iconCode = getMostCommon(dayData.icons);
    
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${day}:</strong> 
      <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${mostCommonCondition}">
      ${mostCommonCondition}, ${avgTemp}°C
    `;
    forecastList.appendChild(listItem);
  });
}

// Helper: Find most frequent item in array
function getMostCommon(arr) {
  const frequency = {};
  let max = 0;
  let result;
  
  arr.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > max) {
      max = frequency[item];
      result = item;
    }
  });
  
  return result;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateVisitCounter();
  fetchForecast();
});



// js to load filter gold/sliver members
async function loadSpotlights() {
  const response = await fetch("data/spotlight.json");
  const data = await response.json();

  const qualified = data.filter(member =>
    member.membership === "Gold" || member.membership === "Silver"
  );

  // Shuffle and pick 2–3 random
  const random = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);
  const container = document.querySelector("#spotlight-container");

  random.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

loadSpotlights();
