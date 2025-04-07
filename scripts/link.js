// Set base URLs
const baseURL = "https://aghadiayeamayanvboernest.github.io/wdd230/";
const linksURL = `${baseURL}links.json`;

// Get the links data from JSON
async function getLinks() {
  try {
    const response = await fetch(linksURL);
    if (!response.ok) throw new Error('Failed to fetch links');
    const data = await response.json();
    displayLinks(data.weeks);
  } catch (error) {
    console.error('Error loading links:', error);
    displayStaticFallback();
  }
}

// Display links in the DOM
function displayLinks(weeks) {
  const ulElement = document.querySelector('.card ul');
  ulElement.innerHTML = ''; // Clear existing content

  weeks.forEach(week => {
    if (week.links.length === 0) {
      // Handle empty weeks (like Week 6)
      const li = document.createElement('li');
      li.textContent = `${week.week}:`;
      ulElement.appendChild(li);
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `${week.week}: `;
    
    week.links.forEach((link, index) => {
      const a = document.createElement('a');
      a.href = link.url.startsWith('http') ? link.url : `${baseURL}${link.url}`;
      a.textContent = link.title;
      li.appendChild(a);
      
      // Add separator if not the last link
      if (index < week.links.length - 1) {
        li.appendChild(document.createTextNode(' | '));
      }
    });

    ulElement.appendChild(li);
  });
}

// Fallback to static content if JSON fails
function displayStaticFallback() {
  document.querySelector('.card ul').innerHTML = `
  <p><strong>Note:</strong> We encountered an issue loading the dynamic links. Here's the static content instead.</p>
    <li>Week 01: <a href="#">Layout</a> | <a href="#">Media Query</a> | <a href="#">JS Pen</a></li>
    <li>Week 02: <a href="week02/design.html">Web Design Principles</a> | <a href="https://codepen.io/aghadiayeamayanvboernest/pen/wBvpjYP">CodePen</a> | <a href="week02/bom.html">JavaScript: DOM Manipulation</a></li>
    <li>Week 03: <a href="week03/images/landscape.webp">Webp</a> | <a href="week03/lazyload.html">Lazy Loading</a> | <a href="week03/responsive-images.html">Responsive Images: srcset</a> | <a href="week03/bom.html">Web Storage API - localStorage</a></li>
    <li>Week 04: <a href="https://codepen.io/aghadiayeamayanvboernest/pen/vYoGbRo">CodePen</a> | <a href="week04/tablebuild.html">HTML Tables for Data Presentation</a> | <a href="/Form-start/index.html">HTML Forms</a></li>
    <li>Week 05: <a href="https://codepen.io/aghadiayeamayanvboernest/pen/jEORrvN">CSS Pseudo-elements codepen</a> | <a href="week05/new-ward-members.json">JSON</a> | <a href="week05/prophets.html">Latter-day Prophets</a> | <a href="week05/weather.html">Consuming a Weather API</a></li>
    <li>Week 06:</li>
  `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', getLinks);