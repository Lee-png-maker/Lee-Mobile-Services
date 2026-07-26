// =========================================
// Lee Mobile Services - booking.js
// =========================================

const businessPhone = "27688685355";

// GPS Location Button
const locationBtn = document.getElementById("locationBtn");

if (locationBtn) {

    locationBtn.addEventListener("click", function () {

        if (!navigator.geolocation) {
            alert("Your device does not support GPS.");
            return;
        }

        locationBtn.innerHTML = "Getting Location...";

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                document.getElementById("address").value =
                    "https://maps.google.com/?q=" + lat + "," + lng;

                locationBtn.innerHTML = "✅ Location Added";

            },

            function () {

                alert("Unable to get your location.");

                locationBtn.innerHTML = "📍 Use My Current Location";

            }

        );

    });

}

// Booking Form
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const property = document.getElementById("property").value;
    const address = document.getElementById("address").value.trim();
    const notes = document.getElementById("notes").value.trim();

    const payment =
        document.querySelector('input[name="payment"]:checked').value;

    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        date === "" ||
        time === ""
    ) {
        alert("Please complete all required fields.");
        return;
    }

    const message =
`*NEW BOOKING*

👤 Name: ${name}

📞 Phone: ${phone}

📧 Email: ${email || "Not provided"}

🧺 Service: ${service}

🏠 Property: ${property}

📅 Date: ${date}

🕒 Time: ${time}

📍
