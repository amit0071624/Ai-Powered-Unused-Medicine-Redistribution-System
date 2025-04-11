import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude }) => {
  useEffect(() => {
    let map = null;
    let marker = null;
    let tileLayer = null;

    try {
      map = L.map("map").setView([latitude, longitude], 12);

      tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup("Delivery Location")
        .openPopup();
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (marker) map.removeLayer(marker);
      if (tileLayer) map.removeLayer(tileLayer);
      if (map) map.remove();
      marker = null;
      tileLayer = null;
      map = null;
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapComponent;
