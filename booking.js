// ===============================
// Lee Mobile Services - booking.js
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

// Photo Preview

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

// Booking Form

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const address = document.getElementById("address").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;
    const gpsLocation = document.getElementById("gpsLocation").value;

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

    await addDoc(collection(db, "bookings"), {

      name: name,
      phone: phone,
      service: service,
      address: address,
      bookingDate: bookingDate,
      bookingTime: bookingTime,
      gpsLocation: gpsLocation,
      photo: photoURL,
      status: "Pending",
      createdAt: new Date()

    });

    window.location.href = "confirmation.html";

    bookingForm.reset();

    preview.style.display = "none";

  }

  catch (error) {

    console.error(error);

    alert("❌ Error saving booking.");

  }

});

// GPS Location

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
