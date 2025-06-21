import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import './css/style.css';
import 'leaflet/dist/leaflet.css';

const API_KEY = 'at_ykjZGTNMmx0kTxhMWn1qaOYr3AC1y';
const IP_API_URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`;
const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2FzaGluZ3RvbjI5OSIsImEiOiJja2dzaTNkMjEwNDM0MzFvZnNnNTNxNjNvIn0.c0RymMFd_Q9NADrTGZh7wg';

const isValidIP = (ip) => {
  const regexp =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regexp.test(ip);
};

const App = () => {
  const [input, setInput] = useState('');
  const [ipInfo, setIpInfo] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const fetchIPData = async (ip = '') => {
    try {
      const res = await fetch(`${IP_API_URL}${ip ? `&ipAddress=${ip}` : ''}`);
      const data = await res.json();
      setIpInfo(data);

      const lat = data.location.lat;
      const lng = data.location.lng;

      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([lat, lng], 13);

        L.tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
          {
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            attributionControl: false 
          }
        ).addTo(mapInstance.current);

        mapInstance.current.attributionControl.remove();

        markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current);
      } else {
        mapInstance.current.setView([lat, lng], 13);
        markerRef.current.setLatLng([lat, lng]);
      }

      markerRef.current.bindPopup(`<b>${data.location.city}</b>`).openPopup();
    } catch (err) {
      alert('Failed to fetch IP data');
    }
  };

  useEffect(() => {
    fetchIPData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidIP(input)) {
      alert('Invalid IP address');
      return;
    }
    fetchIPData(input);
    setInput('');
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">IP Address Tracker</h1>
        <form className="header__form" onSubmit={handleSubmit}>
          <input
            className="header__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for any IP address"
          />
          <button className="header__button" type="submit">
            <img src="../src/images/icon-arrow.svg" alt="arrow icon" />
          </button>
        </form>
        <div className="header__box">
          <div className="header__ip-info">
            <div className="header__ip-title">IP Address</div>
            <span className="header__ip-result">{ipInfo?.ip || '--'}</span>
          </div>
          <div className="header__ip-info">
            <div className="header__ip-title">Location</div>
            <span className="header__ip-result">{ipInfo?.location?.city || '--'}</span>
          </div>
          <div className="header__ip-info">
            <div className="header__ip-title">Timezone</div>
            <span className="header__ip-result">
              UTC {ipInfo?.location?.timezone || '--'}
            </span>
          </div>
          <div className="header__ip-info">
            <div className="header__ip-title">ISP</div>
            <span className="header__ip-result">{ipInfo?.isp || '--'}</span>
          </div>
        </div>
      </header>
      <main className="content">
        <div id="mapid" ref={mapRef}></div>
      </main>
    </>
  );
};

export default App;
