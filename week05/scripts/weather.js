const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=21c134eb2398a98f71ef9dbbf9a45421';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconSrc = ` https://openweathermap.org/img/w/10d.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

  