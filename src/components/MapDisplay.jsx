import { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapDisplay = ({ lat, lng, locationName }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lng], 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
          'pk.eyJ1Ijoid2FzaGluZ3RvbjI5OSIsImEiOiJja2dzaTNkMjEwNDM0MzFvZnNnNTNxNjNvIn0.c0RymMFd_Q9NADrTGZh7wg',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(mapInstanceRef.current);
    }

    mapInstanceRef.current.setView([lat, lng], 13);
    L.marker([lat, lng]).addTo(mapInstanceRef.current)
      .bindPopup(`<b>${locationName}</b>`)
      .openPopup();

  }, [lat, lng, locationName]);

  return <div id="mapid" ref={mapRef}></div>;
};

export default MapDisplay;
