
  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Get values from URL parameters
    const username = urlParams.get("username");
    const email = urlParams.get("email");
    const rating = urlParams.get("rating");

    // Insert values into the page
    document.getElementById("display-username").textContent = username || "N/A";
    document.getElementById("display-email").textContent = email || "N/A";
    document.getElementById("display-rating").textContent = rating || "N/A";
  });

