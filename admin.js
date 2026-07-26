// ===============================
// Lee Mobile Services
// admin.js Version 3
// ===============================

import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const bookingList = document.getElementById("bookingList");

const totalBookings = document.getElementById("totalBookings");
const pendingBookings = document.getElementById("pendingBookings");
const completedBookings = document.getElementById("completedBookings");

// Load Bookings

async function loadBookings() {

    bookingList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "bookings"));

    let total = 0;
    let pending = 0;
    let completed = 0;

    snapshot.forEach((documentData) => {

        total++;

        const booking = documentData.data();

        if (booking.status === "Pending") pending++;
        if (booking.status === "Completed") completed++;

        bookingList.innerHTML += `

<tr>

<td>${booking.name || ""}</td>

<td>${booking.phone || ""}</td>

<td>${booking.service || ""}</td>

<td>${booking.address || ""}</td>

<td>${booking.bookingDate || ""}</td>

<td>${booking.bookingTime || ""}</td>

<td>

${booking.photo
? `<img src="${booking.photo}" width="80" style="border-radius:8px;">`
: "No Photo"}

</td>

<td>

<select onchange="updateStatus('${documentData.id}', this.value)">

<option value="Pending" ${booking.status==="Pending"?"selected":""}>Pending</option>

<option value="Confirmed" ${booking.status==="Confirmed"?"selected":""}>Confirmed</option>

<option value="On the Way" ${booking.status==="On the Way"?"selected":""}>On the Way</option>

<option value="Completed" ${booking.status==="Completed"?"selected":""}>Completed</option>

<option value="Cancelled" ${booking.status==="Cancelled"?"selected":""}>Cancelled</option>

</select>

</td>

<td>

<button onclick="deleteBooking('${documentData.id}')">

Delete

</button>

</td>

</tr>

`;

    });

    totalBookings.textContent = total;
    pendingBookings.textContent = pending;
    completedBookings.textContent = completed;

}

// Update Status

window.updateStatus = async function(id, status){

    await updateDoc(doc(db, "bookings", id), {

        status: status

    });

    alert("Booking updated.");

    loadBookings();

}

// Delete Booking

window.deleteBooking = async function(id){

    if(confirm("Delete this booking?")){

        await deleteDoc(doc(db, "bookings", id));

        loadBookings();

    }

}

// Logout

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async ()=>{

    await signOut(auth);

    window.location.href="login.html";

});

// Start

loadBookings();
