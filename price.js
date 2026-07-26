
// ====================================
// Lee Mobile Services - price.js
// ====================================

// Starting prices (South African Rand)
const prices = {
    "Mobile Laundry": 150,
    "Mobile Car Wash": 180,
    "Home Cleaning": 350,
    "Window Cleaning": 250,
    "Couch Cleaning": 450,
    "Mattress Cleaning": 300,
    "Pool Cleaning": 600,
    "Plumbing": 450,
    "Dog Wash": 200,
    "Home Renovations": "Quote Required",
    "Painting": "Quote Required",
    "Shoe Cleaning": 120
};

const serviceSelect = document.getElementById("service");
const priceDisplay = document.getElementById("priceDisplay");

function updatePrice() {

    const selectedService = serviceSelect.value;
    const price = prices[selectedService];

    if (price === "Quote Required") {

        priceDisplay.innerHTML =
            "<strong>Estimated Price:</strong> Quote Required";

    } else {

        priceDisplay.innerHTML =
            "<strong>Estimated Price:</strong> R" + price;

    }

}

// Show price when page loads
updatePrice();

// Update when customer changes service
serviceSelect.addEventListener("change", updatePrice);
