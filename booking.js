// ==========================================
// Lee Mobile Services - booking.js
// Firebase + optional EmailJS notification
// No payment required during initial booking
// ==========================================


import {
    db,
    storage
} from "./firebase.js";


import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";



// ==========================================
// PHOTO PREVIEW
// ==========================================

const photoInput =
    document.getElementById(
        "photo"
    );


const preview =
    document.getElementById(
        "preview"
    );


if (
    photoInput &&
    preview
) {

    photoInput.addEventListener(
        "change",
        () => {

            const file =
                photoInput.files[0];


            if (!file) {

                preview.src = "";

                preview.style.display =
                    "none";

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select an image file."
                );

                photoInput.value = "";

                preview.src = "";

                preview.style.display =
                    "none";

                return;

            }


            // Maximum 10 MB

            if (
                file.size >
                10 * 1024 * 1024
            ) {

                alert(
                    "Please choose an image smaller than 10 MB."
                );

                photoInput.value = "";

                preview.src = "";

                preview.style.display =
                    "none";

                return;

            }


            preview.src =
                URL.createObjectURL(
                    file
                );


            preview.style.display =
                "block";

        }
    );

}



// ==========================================
// BOOKING FORM
// ==========================================

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if (bookingForm) {


    bookingForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();



            const submitButton =
                bookingForm.querySelector(
                    'button[type="submit"]'
                );



            try {


                // ==========================================
                // CUSTOMER DETAILS
                // ==========================================

                const name =
                    document
                        .getElementById(
                            "name"
                        )
                        ?.value
                        .trim()
                    || "";


                const phone =
                    document
                        .getElementById(
                            "phone"
                        )
                        ?.value
                        .trim()
                    || "";


                const email =
                    document
                        .getElementById(
                            "email"
                        )
                        ?.value
                        .trim()
                    || "";


                const service =
                    document
                        .getElementById(
                            "service"
                        )
                        ?.value
                    || "";


                const property =
                    document
                        .getElementById(
                            "property"
                        )
                        ?.value
                    || "";


                const address =
                    document
                        .getElementById(
                            "address"
                        )
                        ?.value
                        .trim()
                    || "";


                const bookingDate =
                    document
                        .getElementById(
                            "bookingDate"
                        )
                        ?.value
                    || "";


                const bookingTime =
                    document
                        .getElementById(
                            "bookingTime"
                        )
                        ?.value
                    || "";


                const gpsLocation =
                    document
                        .getElementById(
                            "gpsLocation"
                        )
                        ?.value
                        .trim()
                    || "";


                const notes =
                    document
                        .getElementById(
                            "notes"
                        )
                        ?.value
                        .trim()
                    || "";



                // ==========================================
                // VALIDATION
                // ==========================================

                if (!name) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                if (!phone) {

                    alert(
                        "Please enter your WhatsApp or phone number."
                    );

                    return;

                }


                if (!service) {

                    alert(
                        "Please select a service."
                    );

                    return;

                }


                if (!bookingDate) {

                    alert(
                        "Please select a preferred date."
                    );

                    return;

                }


                if (!bookingTime) {

                    alert(
                        "Please select a preferred time."
                    );

                    return;

                }


                if (!address) {

                    alert(
                        "Please enter the service address."
                    );

                    return;

                }



                // ==========================================
                // PREVENT DOUBLE SUBMISSION
                // ==========================================

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "⏳ Submitting Booking...";

                }



                // ==========================================
                // PHOTO UPLOAD
                // ==========================================

                let photoURL = "";


                const file =
                    photoInput?.files?.[0]
                    || null;


                if (file) {


                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {

                        throw new Error(
                            "Please select a valid image."
                        );

                    }


                    if (
                        file.size >
                        10 * 1024 * 1024
                    ) {

                        throw new Error(
                            "The selected image is larger than 10 MB."
                        );

                    }


                    const safeFileName =
                        file.name.replace(
                            /[^a-zA-Z0-9._-]/g,
                            "_"
                        );


                    const storageRef =
                        ref(
                            storage,
                            `bookings/${Date.now()}_${safeFileName}`
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



                // ==========================================
                // BOOKING DATA
                // ==========================================

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

                    // No payment at booking stage

                    payment:
                        "Not selected",

                    paymentStatus:
                        "Not Paid",

                    photo:
                        photoURL,

                    status:
                        "Pending",

                    createdAt:
                        new Date()

                };



                // ==========================================
                // SAVE TO FIREBASE
                // ==========================================

                const bookingRef =
                    await addDoc(
                        collection(
                            db,
                            "bookings"
                        ),
                        bookingData
                    );


                console.log(
                    "Booking created:",
                    bookingRef.id
                );



                // ==========================================
                // EMAILJS NOTIFICATION
                // ==========================================

                if (
                    typeof emailjs !==
                    "undefined"
                ) {

                    try {

                        await emailjs.send(

                            "service_vn8t8vf",

                            "template_q6x3tmq",

                            {

                                name:
                                    name,

                                phone:
                                    phone,

                                email:
                                    email,

                                service:
                                    service,

                                date:
                                    bookingDate,

                                time:
                                    bookingTime,

                                address:
                                    address,

                                property_type:
                                    property,

                                message:
                                    notes,

                                payment:
                                    "Not selected",

                                payment_status:
                                    "Not Paid",

                                booking_id:
                                    bookingRef.id

                            }

                        );


                        console.log(
                            "EmailJS notification sent."
                        );


                    }

                    catch (
                        emailError
                    ) {

                        console.error(
                            "EmailJS notification failed:",
                            emailError
                        );

                    }

                }



                // ==========================================
                // SUCCESS
                // ==========================================

                alert(

                    "✅ Booking received successfully!\n\n" +

                    "We will contact you to confirm " +

                    "availability and the final price."

                );



                sessionStorage.setItem(

                    "leeBookingId",

                    bookingRef.id

                );



                bookingForm.reset();



                if (preview) {

                    preview.src = "";

                    preview.style.display =
                        "none";

                }



                // Confirmation page

                window.location.href =
                    "confirmation.html";


            }



            catch (error) {


                console.error(

                    "Booking error:",

                    error

                );


                alert(

                    "❌ Booking could not be submitted.\n\n" +

                    (
                        error?.message
                        ||
                        "Please try again or book via WhatsApp."
                    )

                );



                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "📅 Submit Booking";

                }

            }

        }

    );

}
