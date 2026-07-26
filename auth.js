
// =====================================
// Lee Mobile Services - auth.js
// Firebase Authentication
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
const auth = getAuth(app);

// Login Form
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        signInWithEmailAndPassword(auth, email, password)

        .then(() => {

            message.style.color = "green";
            message.innerHTML = "✅ Login successful...";

            setTimeout(function () {
                window.location.href = "admin.html";
            }, 1000);

        })

        .catch((error) => {

            message.style.color = "red";
            message.innerHTML = "❌ " + error.message;

        });

    });

}

// Protect admin page
if (window.location.pathname.includes("admin.html")) {

    onAuthStateChanged(auth, function (user) {

        if (!user) {

            window.location.href = "login.html";

        }

    });

}

// Logout Function
window.logout = function () {

    signOut(auth)

    .then(() => {

        alert("Logged out successfully.");

        window.location.href = "login.html";

    })

    .catch((error) => {

        alert(error.message);

    });

};
