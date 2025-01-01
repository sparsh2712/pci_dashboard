// src/components/MapView.jsx
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import { useRoadContext } from '../context/RoadContext';
import 'leaflet/dist/leaflet.css';

// A helper component to expose the map instance
const MapController = forwardRef((_, ref) => {
  const map = useMap();

  // Expose the map instance to the parent via ref
  useImperativeHandle(ref, () => map, [map]);

  return null;
});

const MapView = forwardRef((_, ref) => {
  const { roadData } = useRoadContext(); // Access road data from the context

  useEffect(() => {
    // This effect can be used for any initial setup or map customization
  }, [roadData]);

  return (
    <MapContainer
      center={[51.505, -0.09]} // Keep default center for now, or you can make it dynamic
      zoom={13}
      style={{
        height: '80vh', // 90% of the viewport height
        width: '97vw', // 90% of the viewport width
      }}
    >
      <MapController ref={ref} /> {/* Attach ref to expose map instance */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Loop through roadData and draw Polyline for each segment */}
      {roadData.map((item, index) =>
        item.segments.map((segment, segIndex) => (
          <Polyline
            key={`${index}-${segIndex}`} // Unique key for each line
            positions={segment.coordinates}
            color="blue"
            weight={3}
          />
        ))
      )}
    </MapContainer>
  );
});

export default MapView;
