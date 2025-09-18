import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons for Leaflet when using bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapView = ({
  center = [20.5937, 78.9629],
  zoom = 5,
  height = '256px',
  className = '',
  markers = [], // [{ position: [lat, lng], popup: 'text' }]
  hotspots = [] // [{ lat, lng, confidence(0..1) }]
}) => {
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const style = useMemo(() => ({ height, width: '100%' }), [height]);
  const visibilityThreshold = 0.35; // only show circles when confidence >= 0.35

  return (
    <div className={className} style={style}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer url={tileUrl} attribution={attribution} />
        {hotspots.map((h, idx) => {
          const c = Math.max(0, Math.min(1, h.confidence ?? 0));
			if (c < visibilityThreshold) return null;
          // Shades of red by confidence (low alpha for low confidence)
          const fillOpacity = 0.25 + c * 0.5; // 0.25..0.75
          const color = `rgba(220, 38, 38, ${Math.min(1, 0.4 + c * 0.5)})`; // red-600 stroke
          const fillColor = `rgba(239, 68, 68, ${fillOpacity})`; // red-500 fill
          // Radius scale: 100m at low to 400m at high (approx; meters units used by CircleMarker's radius in pixels? Circle uses meters; CircleMarker uses pixels)
          const radius = 10 + c * 20; // pixels for CircleMarker
          return (
            <CircleMarker
              key={`hs-${idx}`}
              center={[h.lat, h.lng]}
              radius={radius}
              pathOptions={{ color, fillColor, fillOpacity }}
            >
              <Popup>
                <div style={{ minWidth: 160 }}>
                  <div><strong>Confidence:</strong> {(c * 100).toFixed(0)}%</div>
                  {h.hazardType ? <div><strong>Type:</strong> {h.hazardType}</div> : null}
                  {h.status ? <div><strong>Status:</strong> {h.status}</div> : null}
                  {h.createdAt ? <div><strong>Time:</strong> {new Date(h.createdAt).toLocaleString()}</div> : null}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        {markers.map((m, idx) => (
          <Marker key={idx} position={m.position}>
            {m.popup ? <Popup>{m.popup}</Popup> : null}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;


