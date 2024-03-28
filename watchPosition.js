    // WATCH POSITION CODE: PLEASE DO NOT USE
    // Requesting location updates
    // function requestLocationUpdates() {
    //     navigator.geolocation.watchPosition(updateUserLocation, function(error) {
    //         console.error('Error getting location:', error);
    //     });
    // }

    // // Requesting location permission once
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     var initialLatLng = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     };

    //     // Initialize map with user's location
    //     map.setView(initialLatLng, 10);

    //     // Show user's location with a blue circle
    //     updateUserLocation(position);

    //     // Start continuous location updates
    //     requestLocationUpdates();
    // }, function(error) {
    //     console.error('Error getting location:', error);
    // });