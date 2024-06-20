let map;
let marker;
let tracking = false;

document.addEventListener("DOMContentLoaded", function() {
	map = document.getElementById("map");
	locationElement = document.getElementById("location");
	trackButton = document.getElementById("track-button");
	stopButton = document.getElementById("stop-button");

	trackButton.addEventListener("click", startTracking);
	stopButton.addEventListener("click", stopTracking);

	initMap();
});

function initMap() {
	map.innerHTML = "";
	const googleMap = document.createElement("div");
	googleMap.style.width = "100%";
	googleMap.style.height = "100%";
	map.appendChild(googleMap);

	const script = document.createElement("script");
	script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMapCallback";
	document.head.appendChild(script);
}

function initMapCallback() {
	const mapOptions = {
		center: { lat: 37.7749, lng: -122.4194 },
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(map, mapOptions);
	marker = new google.maps.Marker({
		position: mapOptions.center,
		map: map,
		title: "Your Location"
	});
}

function startTracking() {
	tracking = true;
	trackButton.disabled = true;
	stopButton.disabled = false;
	navigator.geolocation.watchPosition(updateLocation, errorHandler, {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	});
}

function stopTracking() {
	tracking = false;
	trackButton.disabled = false;
	stopButton.disabled = true;
	navigator.geolocation.clearWatch();
}

function updateLocation(position) {
	const lat = position.coords.latitude;
	const lng = position.coords.longitude;
	marker.setPosition(new google.maps.LatLng(lat, lng));
	locationElement.textContent = `Latitude: ${lat}, Longitude: ${lng}`;
}

function errorHandler(error) {
	console.error("Error getting location:", error);
}