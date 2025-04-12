
// Quotes with authors
const quotes = [
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In the end, it’s not the years in your life that count. It’s the life in your years.", author: "Abraham Lincoln" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "You have to do your own growing no matter how tall your grandfather was.", author: "Abraham Lincoln" },
    { text: "The most important thing is the name you choose to give yourself.", author: "Oprah Winfrey" },
    { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future depends on what we do in the present.", author: "Mahatma Gandhi" }
  ];
  
  // Function to get and display the quote of the day
  function getQuoteOfTheDay() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    return `"${selectedQuote.text}" - ${selectedQuote.author}`;
  }
  
  // Get reference to the visit message element
  const visitMessage = document.getElementById("visit-message");
  
  // Get the current time in milliseconds
  const now = Date.now();
  
  // Check if there is a stored last visit timestamp
  const lastVisit = localStorage.getItem("lastVisit");
  
  if (lastVisit) {
    // Calculate the difference in days between visits
    const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    
    // Display an appropriate message based on the time difference
    if (daysDiff < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysDiff} days ago.`;
    }
  } else {
    // Display a welcome message for first-time visitors
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  }
  
  // Store the current visit time in localStorage
  localStorage.setItem("lastVisit", now);
  
  // Display the Quote of the Day
  const quoteElement = document.getElementById("quote-of-the-day");
  quoteElement.textContent = "Quote of the Day: " + getQuoteOfTheDay();


 


// OpenWeatherMap API Variables
const apiKey = "fcb9c4b2ba563009b0f04f129f01e52d"; // Replace with your valid OpenWeatherMap API key
const city = "Benin City";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

// Function to Capitalize Text
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Function to Fetch and Display Current Weather
async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Update Temperature, Condition, and Weather Icon
    document.getElementById("temp").textContent = Math.round(data.main.temp);
    document.getElementById("condition").textContent = capitalize(data.weather[0].description);
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather-icon").alt = data.weather[0].description;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("temp").textContent = "--";
    document.getElementById("condition").textContent = "Unable to fetch weather data";
    document.getElementById("weather-icon").src = "";
    document.getElementById("weather-icon").alt = "No data";
  }
}

// Function to Fetch and Display 3-Day Forecast
async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Populate 3-Day Forecast
    const forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = ""; // Clear existing forecast
    for (let i = 0; i < 3; i++) {
      const forecast = data.list[i * 8]; // Get forecast for every 24 hours
      const listItem = document.createElement("li");
      listItem.textContent = `${new Date(forecast.dt_txt).toLocaleDateString()}: ${Math.round(forecast.main.temp)}°C - ${capitalize(forecast.weather[0].description)}`;
      forecastElement.appendChild(listItem);
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    const forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = "<li>Unable to fetch forecast data</li>";
  }
}

// Function to Update Page Visit Counter
function updateVisitCounter() {
  const visitCounterElement = document.getElementById("visit-counter");
  let visitCount = localStorage.getItem("pageVisits");

  if (!visitCount) {
    visitCount = 0;
  }

  visitCount++;
  localStorage.setItem("pageVisits", visitCount);
  visitCounterElement.textContent = visitCount;
}

// Initialize Weather, Forecast, and Visit Counter
function initializePage() {
  getWeather();
  getForecast();
  updateVisitCounter();
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);