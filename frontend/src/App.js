import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const [location, setLocation] = useState({
    lat: 59.9139,  // Default to Oslo
    lng: 10.7522,
  });
  const [zoom, setZoom] = useState(14);
  const [places, setPlaces] = useState([]);

  // Use Geolocation API to get the user's current location test
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Geolocation permission denied or unavailable.");
        }
      );
    }
  }, []);

  // Fetch nearby places (e.g., grocery stores and hotels) using Places API
  const apiIsLoaded = (map, maps) => {
    if (!map || !maps) return;

    const service = new maps.places.PlacesService(map);
    
    const request = {
      location: new maps.LatLng(location.lat, location.lng),
      radius: '1500', // Search within 1.5km radius
      type: ['grocery_or_supermarket', 'hotel'], // Specify types
    };

    service.nearbySearch(request, (results, status) => {
      if (status === maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "apiKey", libraries: ['places'] }} 
        center={location}
        zoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {/* Marker for user's current location */}
        <AnyReactComponent lat={location.lat} lng={location.lng} />

        {/* Display markers for nearby places */}
        {places.map((place, index) => (
          <AnyReactComponent
            key={index}
            lat={place.geometry.location.lat()}
            lng={place.geometry.location.lng()}
            text={place.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
