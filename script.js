function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(showPosition,errorLocation);

}else{

alert("Geolocation is not supported by this browser.");

}

}

function showPosition(position){

document.getElementById("gpsLocation").value=

position.coords.latitude +

"," +

position.coords.longitude;

}

function errorLocation(){

alert("Unable to get your location.");

}
