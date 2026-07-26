// ================================
// Lee Mobile Services - Version 2
// ================================

const businessPhone = "27688685355"; // South Africa format (27 + number)

// Welcome message
window.onload = function () {
    console.log("Lee Mobile Services App Loaded");
};

// Book buttons
const bookButtons = document.querySelectorAll(".service-card button");

bookButtons.forEach(button => {

    button.addEventListener("click", function () {

        const service = this.parentElement.querySelector("h3").innerText;

        const message =
`Hello Lee Mobile Services,

I would like to book the following service:

Service: ${service}

Name:

Phone:

Address:

Preferred Date:

Preferred Time:

Thank you.`;

        const url =
`https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    });

});

// Hero Book Now button
const heroButton = document.querySelector(".hero button");

if(heroButton){

heroButton.addEventListener("click",function(){

document.getElementById("services").scrollIntoView({
behavior:"smooth"
});

});

}

// WhatsApp button
const whatsappBtn=document.getElementById("whatsappBtn");

if(whatsappBtn){

whatsappBtn.addEventListener("click",function(){

window.open(
"https://wa.me/"+businessPhone,
"_blank"
);

});

}

// Call button
const callBtn=document.getElementById("callBtn");

if(callBtn){

callBtn.addEventListener("click",function(){

window.location.href="tel:+27688685355";

});

}
