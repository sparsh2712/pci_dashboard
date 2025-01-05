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

const MapView = forwardRef(({ pciType }, ref) => {
  const { roadData } = useRoadContext();

  useEffect(() => {
    console.log('pciType updated:', pciType);
  }, [pciType]);

  const getColor = (type, pciScore, velocityScore) => {
    const score = type === 'pci_score' ? pciScore : velocityScore;
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
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '80vh', width: '97vw' }}
    >
      <MapController ref={ref} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {roadData.map((item, roadIndex) =>
        item.segments.map((segment, segmentIndex) => {
          const velocityKmph = ((segment.avg_velocity * 18) / 5).toFixed(2);
          const velocityScore = calculateVelocityScore(velocityKmph);
          const color = getColor(pciType, segment.pci_score, velocityScore);

          return (
            <Polyline
              key={`${roadIndex}-${segmentIndex}-${pciType}`}
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
