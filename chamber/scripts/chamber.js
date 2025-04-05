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