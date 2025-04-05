// Enhanced validation for the form
document.querySelector('form').addEventListener('submit', function(e) {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Custom validation messages
    if (firstName === '') {
        alert('Please enter your first name');
        e.preventDefault();
        return;
    }
    
    // Phone number validation for Nigerian format
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid Nigerian phone number (e.g., 08031234567 or +2348031234567)');
        e.preventDefault();
        return;
    }
    
    // Set timestamp before submission
    document.getElementById('timestamp').value = new Date().toISOString();
});

// Show pricing information based on selected membership
const membershipPrices = {
    'NP': 'Free',
    'Bronze': '₦15,000/month',
    'Silver': '₦30,000/month',
    'Gold': '₦50,000/month'
};

document.getElementById('membership-level').addEventListener('change', function() {
    const priceDisplay = document.getElementById('price-display') || 
        document.createElement('div');
    priceDisplay.id = 'price-display';
    priceDisplay.textContent = `Price: ${membershipPrices[this.value]}`;
    this.parentNode.appendChild(priceDisplay);
});