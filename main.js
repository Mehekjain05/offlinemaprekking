var sessionData = [];

// Function to update user's location on the map and store coordinates
function updateUserLocation() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log("LATITUDE AND LONGITUDE", latitude, " ", longitude);

            // Update marker position
            updateMarkerPosition(latitude, longitude);

            if (recordSessionCondition === true) {
                sessionData.push({ lat: latitude, lng: longitude });
                console.log('SESSION DATA', sessionData);

                // Add marker for the new coordinate
                var newMarker = L.marker([latitude, longitude]).addTo(map);
                // You can customize the marker's icon or color here
            }
            if (sessionData.length > 0) {
                addMarkersForSessionData();
            }

            // Center map on current location
            map.setView([latitude, longitude], map.getZoom());
        },
        function (error) {
            // Handle errors
            console.error("Error getting location:", error);
        }
    );
}

// Function to update marker position
function updateMarkerPosition(lat, lng) {
    marker.setLatLng([lat, lng]);
}

// Event listener for record button
document.getElementById('recordButton').addEventListener('click', function () {
    recordSessionCondition = !recordSessionCondition;
    console.log('CONDITION', recordSessionCondition);
});


// Function to add markers for existing session data
function addMarkersForSessionData() {
    let myMarkerIcon = L.icon({
        iconUrl:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
        shadowUrl:
            "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [3, -34],
        shadowSize: [41, 41],
    });


    sessionData.forEach(function (coord) {
        // You can customize the marker's icon or color here
        let myMarker = L.marker([coord.lat, coord.lng], {
            // draggable: true,
            bounceOnAdd: true,
            bounceOnAddOptions: {
                duration: 1000,
                height: 800,
                function() {
                    bindPopup(muPopup).openOn(mymap);
                },
            },
            icon: myMarkerIcon,
        }).addTo(map)
    });
}


// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
    var baseLayer = L.tileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?",
        {
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
    );

    var map = L.map("map", {
        center: [22.735656, 79.892578],
        zoom: 5,
        zoomControl: false,
        layers: [baseLayer],
        contextmenu: true,
        contextmenuWidth: 140,
        contextmenuItems: [
            {
                text: "Start from here",
                callback: startHere,
            },
            "-",
            {
                text: "Go to here",
                callback: goHere,
            },
        ],
    });

    var control = L.Routing.control({
        waypoints: [L.latLng(12.972442, 77.580643), L.latLng(31.104605, 77.173424)],
        createMarker: function (i, waypoints, n) {
            var startIcon = L.icon({
                iconUrl:
                    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [3, -34],
                shadowSize: [41, 41],
            });
            var sampahIcon = L.icon({
                iconUrl:
                    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [3, -34],
                shadowSize: [41, 41],
            });
            var destinationIcon = L.icon({
                iconUrl:
                    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [3, -34],
                shadowSize: [41, 41],
            });
            if (i == 0) {
                marker_icon = startIcon;
            } else if (i > 0 && i < n - 1) {
                marker_icon = sampahIcon;
            } else if (i == n - 1) {
                marker_icon = destinationIcon;
            }
            var marker = L.marker(waypoints.latLng, {
                draggable: true,
                bounceOnAdd: true,
                bounceOnAddOptions: {
                    duration: 1000,
                    height: 800,
                    function() {
                        bindPopup(muPopup).openOn(mymap);
                    },
                },
                icon: marker_icon,
            });
            return marker;
        },

        showAlternatives: true,
        show: false,
        altLineOptions: {
            styles: [
                { color: "black", opacity: 0.15, weight: 9 },
                { color: "white", opacity: 0.8, weight: 6 },
                { color: "blue", opacity: 0.5, weight: 2 },
            ],
        },
        geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    function startHere(e) {
        control.spliceWaypoints(0, 1, e.latlng);
    }

    function goHere(e) {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
    }

    var marker = L.marker([0, 0]).addTo(map);

    var recordSessionCondition = false;
    // Array to store coordinates


    updateUserLocation();
    setInterval(updateUserLocation, 5000);
} else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
}