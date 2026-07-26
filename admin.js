
// ===========================================
// Lee Mobile Services - admin.js
// Firebase Firestore Admin Dashboard
// ===========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
getFirestore,
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-Ik-sIZhg3ShrywwJif0It5PH6R17Mu0",
  authDomain: "lee-mobile-services.firebaseapp.com",
  projectId: "lee-mobile-services",
  storageBucket: "lee-mobile-services.firebasestorage.app",
  messagingSenderId: "507796082180",
  appId: "1:507796082180:web:8df5734768f261f21b2f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const bookingTable = document.getElementById("bookingTable");
const totalBookings = document.getElementById("totalBookings");

async function loadBookings() {

    bookingTable.innerHTML = "";

    const snapshot = await getDocs(collection(db, "bookings"));

    totalBookings.innerHTML = snapshot.size;

    if (snapshot.empty) {

        bookingTable.innerHTML =
       
