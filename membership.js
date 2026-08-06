
// ======================================
// Lee Mobile Services - membership.js
// Firebase + EmailJS
// ======================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const membershipForm = document.querySelector(".booking-form");

membershipForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    const name = membershipForm.querySelector('input[type="text"]').value.trim();
    const email = membershipForm.querySelector('input[type="email"]').value.trim();
    const phone = membershipForm.querySelector('input[type="tel"]').value.trim();

    const address = membershipForm.querySelectorAll('input[type="text"]')[1].value.trim();

    const plan = membershipForm.querySelector("select").value;

    const message = membershipForm.querySelector("textarea").value.trim();

    // Prevent duplicate email

    const q = query(
      collection(db, "members"),
      where("email", "==", email)
    );

    const existing = await getDocs(q);

    if (!existing.empty) {
      alert("❌ This email is already registered.");
      return;
    }

    // Generate Member ID

    const membersSnapshot = await getDocs(collection(db, "members"));

    const memberID =
      "LEE" +
      String(membersSnapshot.size + 1).padStart(6, "0");

    // Save to Firestore

    await addDoc(collection(db, "members"), {

      memberID: memberID,
      fullName: name,
      email: email,
      phone: phone,
      address: address,
      plan: plan,
      message: message,
      status: "Active",
      joined: new Date()

    });

    // Welcome Email

    await emailjs.send(
      "service_vn8t8vf",
      "template_q6x3tmq",
      {
        name: name,
        email: email,
        phone: phone,
        service: "Membership",
        address: address,
        property_type: plan,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        payment: plan,
        message:
          "Welcome to Lee Mobile Services!\n\nYour Membership ID: " +
          memberID
      }
    );

    alert(
      "🎉 Welcome to Lee Mobile Services!\n\n" +
      "Member ID: " +
      memberID
    );

    membershipForm.reset();

  }

  catch (error) {

    console.error(error);

    alert("❌ Registration failed.\n\n" + error.message);

  }

});
