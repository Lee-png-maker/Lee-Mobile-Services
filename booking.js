// ===============================
// Lee Mobile Services - booking.js
// Firebase + EmailJS
// ===============================

import { db, storage } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

// ===============================
// Photo Preview
// ===============================

const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");

if (photoInput) {
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = "block";
    }
  });
}

// ===============================
// Booking Form
// ===============================

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const service = document.getElementById("service").value;
    const property = document.getElementById("property").value;
    const address = document.getElementById("address").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;
    const gpsLocation = document.getElementById("gpsLocation").value;
    const notes = document.getElementById("notes").value;

    const payment = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    let photoURL = "";

    const file = photoInput.files[0];

    if (file) {

      const storageRef = ref(
        storage,
        "bookings/" + Date.now() + "_" + file.name
      );

      await uploadBytes(storageRef, file);

      photoURL = await getDownloadURL(storageRef);

    }

    // Save booking to Firestore

    await addDoc(collection(db, "bookings"), {

      name,
      phone,
      email,
      service,
      property,
      address,
      bookingDate,
      bookingTime,
      gpsLocation,
      notes,
      payment,
      photo: photoURL,
      status: "Pending",
      createdAt: new Date()

    });

    // Send Email

    await emailjs.send(
      "service_vn8t8vf",
      "template_q6x3tmq",
      {
        name: name,
        phone: phone,
        email: email,
        service: service,
        property: property,
        address: address,
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        gpsLocation: gpsLocation,
        notes: notes,
        payment: payment
      }
    );

    alert("✅ Booking submitted successfully!");

    bookingForm.reset();

    preview.style.display = "none";

    window.location.href = "confirmation.html";

  }

  catch (error) {

    console.error(error);

    alert("❌ Booking failed.\n\n" + error.message);

  }

});

// ===============================
// GPS Location
// ===============================

window.getLocation = function () {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition((position) => {

      document.getElementById("gpsLocation").value =
        position.coords.latitude +
        "," +
        position.coords.longitude;

    });

  } else {

    alert("Geolocation is not supported.");

  }

};

// ===============================
// Location Button
// ===============================

const locationBtn = document.getElementById("locationBtn");

if (locationBtn) {

  locationBtn.addEventListener("click", () => {

    getLocation();

  });

}
