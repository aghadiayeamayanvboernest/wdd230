document.addEventListener("DOMContentLoaded", function() { 
    const form = document.querySelector("form");
    
    // Password validation
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");

    function validatePasswords() {
        if (password.value !== confirmPassword.value) {
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
            confirmPassword.setCustomValidity("Passwords do not match!");
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none";
            confirmPassword.setCustomValidity("");
        }
    }

    confirmPassword.addEventListener("input", validatePasswords);
    password.addEventListener("input", validatePasswords);

    form.addEventListener("submit", function(event) {
        if (password.value !== confirmPassword.value) {
            event.preventDefault();
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
            confirmPassword.setCustomValidity("Passwords do not match!");
            password.value = "";
            confirmPassword.value = "";
            password.focus();
        }
    });

    // Email validation
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    emailInput.addEventListener("input", function() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;

        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Invalid email. Use a byui.edu email.";
            emailError.style.display = "block";
            emailInput.setCustomValidity("Invalid email. Use a byui.edu email.");
        } else {
            emailError.textContent = "";
            emailError.style.display = "none";
            emailInput.setCustomValidity("");
        }
    });

    // Rating value display
    const ratingInput = document.getElementById("rating");
    const ratingValue = document.getElementById("rating-value");

    ratingInput.addEventListener("input", function() {
        ratingValue.textContent = ratingInput.value;
    });
});

