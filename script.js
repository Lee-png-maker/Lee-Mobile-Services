// ========================================
// LEE MOBILE SERVICES - SCRIPT.JS
// ========================================


// ========================================
// GET CUSTOMER GPS LOCATION
// ========================================

function getLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported by your browser.");

        return;
    }

    navigator.geolocation.getCurrentPosition(
        showPosition,
        errorLocation,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ========================================
// SHOW GPS LOCATION
// ========================================

function showPosition(position) {

    const gpsLocation = document.getElementById("gpsLocation");

    if (!gpsLocation) {

        console.error(
            "GPS location field (#gpsLocation) was not found."
        );

        return;
    }

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    gpsLocation.value = latitude + "," + longitude;

    console.log(
        "Customer location:",
        latitude + "," + longitude
    );
}


// ========================================
// LOCATION ERROR
// ========================================

function errorLocation(error) {

    let message = "Unable to get your location.";

    if (error) {

        switch (error.code) {

            case error.PERMISSION_DENIED:
                message =
                    "Location permission was denied. Please allow location access and try again.";
                break;

            case error.POSITION_UNAVAILABLE:
                message =
                    "Your location is currently unavailable. Please try again.";
                break;

            case error.TIMEOUT:
                message =
                    "Location request timed out. Please try again.";
                break;

            default:
                message =
                    "Unable to get your location. Please try again.";
        }
    }

    alert(message);

    console.error("Geolocation error:", error);
}
