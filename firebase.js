// ===========================================
// Lee Mobile Services - Firebase Configuration
// ===========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-Ik-sIZhg3ShrywwJif0It5PH6R17Mu0",
  authDomain: "lee-mobile-services.firebaseapp.com",
  projectId: "lee-mobile-services",
  storageBucket: "lee-mobile-services.firebasestorage.app",
  messagingSenderId: "507796082180",
  appId: "1:507796082180:web:8df5734768f261f21b2f51",
  measurementId: "G-S0Q2TGJJLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export Services
export { app, db, auth, storage };
