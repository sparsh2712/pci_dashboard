import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import { MapContainer, TileLayer, Polyline, Tooltip, useMap } from 'react-leaflet';
import { useRoadContext } from '../context/RoadContext';
import 'leaflet/dist/leaflet.css';

// Component to expose the map instance
const MapController = forwardRef((_, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => map, [map]);
  return null;
});

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');

      const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
      const labels = [1, 2, 3, 4, 5];

      // Add styles for the legend box
      div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Translucent white background
      div.style.padding = '10px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
      div.style.fontFamily = '"Cilia", sans-serif'; // Use the Cilia font
      div.style.color = 'black'; // Black text

      div.innerHTML = '<strong>Legend</strong><br>';
      colors.forEach((color, index) => {
        div.innerHTML += `
          <i style="background:${color}; width: 12px; height: 12px; display: inline-block; margin-right: 5px; border: 1px solid #000;"></i>
          <span>${labels[index]}</span><br>
        `;
      });

      return div;
    };

    legend.addTo(map);

    return () => {
      map.removeControl(legend);
    };
  }, [map]);

  return null;
};



const MapView = forwardRef(({ pciType, displayedRoads }, ref) => {
  const { roadData } = useRoadContext();
  const roadsToDisplay = displayedRoads.length > 0 ? displayedRoads : roadData;

  useEffect(() => {
    console.log('pciType updated:', pciType);
  }, [pciType]);

  const getColor = (type, pciScore, velocityScore) => {
    const score = type === 'pciBased' ? pciScore : velocityScore;
    const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
    return colors[score - 1];
  };

  const calculateVelocityScore = (velocityKmph) => {
    if (velocityKmph >= 39) return 5;
    if (velocityKmph >= 30) return 4;
    if (velocityKmph >= 20) return 3;
    if (velocityKmph >= 10) return 2;
    return 1;
  };

  return (
    <MapContainer
      center={[19, 78]}
      zoom={13}
      style={{ height: '80vh', width: '97vw' }}
    >
      <MapController ref={ref} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Legend />

    {roadsToDisplay.map((item, roadIndex) =>
        item.segments.map((segment, segmentIndex) => {
          const velocityKmph = ((segment.avg_velocity * 18) / 5).toFixed(2);
          const velocityScore = calculateVelocityScore(velocityKmph);
          const color = getColor(pciType, segment.pci_score, velocityScore);

          return (
            <Polyline
              key={`${roadIndex}-${segmentIndex}-${pciType}-${displayedRoads}`}
              positions={segment.coordinates}
              color={color}
              weight={3}
            >
              <Tooltip sticky>
                <div>
                  <strong>Road Name:</strong> {item.roadName} <br />
                  <strong>Date:</strong> {item.date} <br />
                  <strong>User Name:</strong> {item.userName} <br />
                  <strong>Average Velocity:</strong> {velocityKmph} km/h <br />
                  <strong>PCI Score:</strong> {segment.pci_score} <br />
                  <strong>Velocity Score:</strong> {velocityScore} 
                </div>
              </Tooltip>
            </Polyline>
          );
        })
      )}
    </MapContainer>
  );
});

export default MapView;
