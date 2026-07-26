// Lee Mobile Services - script.js

const bookBtn = document.getElementById("bookBtn");
const message = document.getElementById("message");

bookBtn.addEventListener("click", function () {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;

    if (name === "" || phone === "") {
        message.innerHTML = "⚠ Please enter your name and phone number.";
        message.style.color = "red";
        return;
    }

    message.innerHTML =
        "✅ Thank you, " +
        name +
        "! Your " +
        service +
        " booking has been received. We will contact you on " +
        phone +
        ".";

    message.style.color = "green";

    // Clear the form
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("service").selectedIndex = 0;
});