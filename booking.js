
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
getFirestore,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-Ik-sIZhg3ShrywwJif0It5PH6R17Mu0",
  authDomain: "lee-mobile-services.firebaseapp.com",
  projectId: "lee-mobile-services",
  storageBucket: "lee-mobile-services.firebasestorage.app",
  messagingSenderId: "507796082180",
  appId: "1:507796082180:web:8df5734768f261f21b2f51",
  measurementId: "G-S0Q2TGJJLP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async function(e){

e.preventDefault();

const booking = {

name: document.getElementById("name").value,

phone: document.getElementById("phone").value,

email: document.getElementById("email").value,

service: document.getElementById("service").value,

date: document.getElementById("date").value,

time: document.getElementById("time").value,

property: document.getElementById("property").value,

address: document.getElementById("address").value,

notes: document.getElementById("notes").value,

createdAt: new Date()

};

try{

await addDoc(collection(db,"bookings"),booking);

alert("Booking saved successfully!");

bookingForm.reset();

}catch(error){

alert("Error saving booking");

console.log(error);

}

});
