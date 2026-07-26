function selectService(serviceName) {
  document.getElementById("service").value = serviceName;

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });
}

document
  .getElementById("bookingForm")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
      document.getElementById("name").value;

    const phone =
      document.getElementById("phone").value;

    const service =
      document.getElementById("service").value;

    const address =
      document.getElementById("address").value;

    const date =
      document.getElementById("date").value;

    const time =
      document.getElementById("time").value;

    const extraMessage =
      document.getElementById("message").value;

    const bookingMessage = `
Hello Lee Mobile Services 👋

I would like to make a booking.

Name: ${name}
Phone: ${phone}
Service: ${service}
Address/Area: ${address}
Preferred Date: ${date}
Preferred Time: ${time}
Additional Information: ${extraMessage}

Please confirm my booking.
`;

    const whatsappNumber = "27688685355";

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(bookingMessage);

    window.open(whatsappURL, "_blank");

  });


if ("serviceWorker" in navigator) {

  window.addEventListener("load", function() {

    navigator.serviceWorker
      .register("service-worker.js")
      .then(function() {
        console.log("Service Worker Registered");
      })
      .catch(function(error) {
        console.log(
          "Service Worker Registration Failed:",
          error
        );
      });

  });

}