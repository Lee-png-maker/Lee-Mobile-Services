// ===============================
// Lee Mobile Services - booking.js
// Firebase + EmailJS + Yoco Payment Link
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
// YOCO PAYMENT LINK
// ===============================

const YOCO_PAYMENT_LINK =
  "https://pay.yoco.com/yengwayo-llnts-5";


// ===============================
// Photo Preview
// ===============================

const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");

if (photoInput && preview) {

  photoInput.addEventListener("change", () => {

    const file = photoInput.files[0];

    if (file) {

      preview.src = URL.createObjectURL(file);

      preview.style.display = "block";

    } else {

      preview.style.display = "none";

    }

  });

}


// ===============================
// Booking Form
// ===============================

const bookingForm =
  document.getElementById("bookingForm");


if (bookingForm) {

  bookingForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    try {

      // ===============================
      // Get Customer Information
      // ===============================

      const name =
        document.getElementById("name").value.trim();

      const phone =
        document.getElementById("phone").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const service =
        document.getElementById("service").value;

      const property =
        document.getElementById("property").value;

      const address =
        document.getElementById("address").value.trim();

      const bookingDate =
        document.getElementById("bookingDate").value;

      const bookingTime =
        document.getElementById("bookingTime").value;

      const gpsLocation =
        document.getElementById("gpsLocation").value;

      const notes =
        document.getElementById("notes").value.trim();


      // ===============================
      // Payment Method
      // ===============================

      const paymentOption =
        document.querySelector(
          'input[name="payment"]:checked'
        );

      const payment =
        paymentOption
          ? paymentOption.value
          : "Cash";


      // ===============================
      // Basic Validation
      // ===============================

      if (!name) {

        alert("Please enter your full name.");

        return;

      }


      if (!phone) {

        alert("Please enter your phone number.");

        return;

      }


      if (!service) {

        alert("Please select a service.");

        return;

      }


      if (!bookingDate) {

        alert("Please select a booking date.");

        return;

      }


      if (!bookingTime) {

        alert("Please select a booking time.");

        return;

      }


      if (!address) {

        alert("Please enter the service address.");

        return;

      }


      // ===============================
      // Prevent Double Submission
      // ===============================

      const submitButton =
        bookingForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
          "⏳ Submitting Booking...";

      }


      // ===============================
      // Upload Photo
      // ===============================

      let photoURL = "";

      const file =
        photoInput && photoInput.files
          ? photoInput.files[0]
          : null;


      if (file) {

        const safeFileName =
          file.name.replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
          );


        const storageRef = ref(
          storage,
          "bookings/" +
          Date.now() +
          "_" +
          safeFileName
        );


        await uploadBytes(
          storageRef,
          file
        );


        photoURL =
          await getDownloadURL(
            storageRef
          );

      }


      // ===============================
      // Payment Status
      // ===============================

      let paymentStatus =
        "Not Paid";


      if (payment === "Yoco") {

        paymentStatus =
          "Awaiting Yoco Payment";

      }


      // ===============================
      // Save Booking to Firestore
      // ===============================

      const bookingData = {

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

        paymentStatus,

        photo: photoURL,

        status: "Pending",

        createdAt: new Date()

      };


      const bookingRef =
        await addDoc(
          collection(db, "bookings"),
          bookingData
        );


      console.log(
        "Booking created:",
        bookingRef.id
      );


      // ===============================
      // Send EmailJS Notification
      // ===============================

      if (
        typeof emailjs !== "undefined"
      ) {

        await emailjs.send(

          "service_vn8t8vf",

          "template_q6x3tmq",

          {

            name: name,

            phone: phone,

            email: email,

            service: service,

            date: bookingDate,

            time: bookingTime,

            address: address,

            property_type: property,

            message: notes,

            payment: payment,

            payment_status: paymentStatus,

            booking_id: bookingRef.id

          }

        );

      }


      // ===============================
      // Yoco Payment
      // ===============================

      if (payment === "Yoco") {

        alert(
          "✅ Booking received!\n\n" +
          "You will now be taken to Yoco to make your payment."
        );


        // Store booking ID temporarily
        // so it can be used on the confirmation page.

        sessionStorage.setItem(
          "leeBookingId",
          bookingRef.id
        );


        sessionStorage.setItem(
          "leePaymentMethod",
          "Yoco"
        );


        sessionStorage.setItem(
          "leePaymentStatus",
          "Awaiting Yoco Payment"
        );


        // Open Yoco Payment Link

        window.location.href =
          YOCO_PAYMENT_LINK;

        return;

      }


      // ===============================
      // Other Payment Methods
      // ===============================

      alert(
        "✅ Booking submitted successfully!"
      );


      bookingForm.reset();


      if (preview) {

        preview.src = "";

        preview.style.display = "none";

      }


      window.location.href =
        "confirmation.html";


    }

    catch (error) {

      console.error(
        "Booking error:",
        error
      );


      alert(
        "❌ Booking failed.\n\n" +
        error.message
      );


      // Re-enable button

      const submitButton =
        bookingForm.querySelector(
          'button[type="submit"]'
        );


      if (submitButton) {

        submitButton.disabled = false;

        submitButton.textContent =
          "📅 Submit Booking";

      }

    }

  });

}


// ===============================
// GPS LOCATION
// ===============================

window.getLocation = function () {

  if (!navigator.geolocation) {

    alert(
      "❌ Geolocation is not supported by your browser."
    );

    return;

  }


  navigator.geolocation.getCurrentPosition(

    (position) => {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;


      const gpsField =
        document.getElementById(
          "gpsLocation"
        );


      if (gpsField) {

        gpsField.value =
          latitude +
          "," +
          longitude;

      }

    },

    (error) => {

      console.error(
        "Location error:",
        error
      );


      alert(
        "❌ Unable to get your location.\n\n" +
        "Please allow location access and try again."
      );

    },

    {

      enableHighAccuracy: true,

      timeout: 10000,

      maximumAge: 0

    }

  );

};


// ===============================
// LOCATION BUTTON
// ===============================

const locationBtn =
  document.getElementById(
    "locationBtn"
  );


if (locationBtn) {

  locationBtn.addEventListener(
    "click",
    () => {

      window.getLocation();

    }
  );

}
