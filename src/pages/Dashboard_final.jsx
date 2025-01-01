import { useState, useEffect, useRef } from 'react';
import MapView from '../components/MapView';
import DataTable from '../components/DataTable';
import SegmentTable from '../components/SegmentTable';
import Summary from '../components/Summary';
import { fetchJourneys } from '../services/api';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRoads, setSelectedRoads] = useState([]);
  const mapRef = useRef(null); // Reference for MapView

  useEffect(() => {
    fetchJourneys().then(setData);
  }, []);

  const handleCheckboxSelect = (road) => {
    setSelectedRoads((prev) =>
      prev.some((r) => r.id === road.id)
        ? prev.filter((r) => r.id !== road.id)
        : [...prev, road]
    );
  };

  const handleZoomToRoad = (roadKey) => {
    console.log("Road key passed to handleZoomToRoad:", roadKey);

    const { userName, roadName } = roadKey;

    if (!userName || !roadName) {
      console.warn("Invalid road key. Missing userName or roadName.");
      return;
    }

    const selectedRoad = data.find(
      (item) =>
        item.userName.trim() === userName.trim() &&
        item.roadName === roadName
    );

    if (!selectedRoad) {
      console.warn("No road data found for the selected key.");
      return;
    }

    console.log("Selected road data:", selectedRoad);

    if (!selectedRoad.segments || selectedRoad.segments.length === 0) {
      console.warn("No segments found in the selected road data.");
      return;
    }

    const roadCoordinates = selectedRoad.segments.flatMap(
      (segment) => segment.coordinates
    );

    if (roadCoordinates.length === 0) {
      console.warn("No coordinates found for the selected road.");
      return;
    }

    const bounds = roadCoordinates.map(([lat, lng]) => [lat, lng]);

    if (!mapRef?.current) {
      console.error("mapRef is not defined or is null.");
      return;
    }

    try {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      console.log("Map zoom adjusted to road bounds.");
    } catch (error) {
      console.error("Error while fitting bounds on map:", error);
    }
  };

  return (
    <div>
      <MapView ref={mapRef} />
      <DataTable
        data={data}
        onCheckboxSelect={handleCheckboxSelect}
        onZoomToRoad={handleZoomToRoad} // Pass to DataTable if needed
      />
      {selectedRoads.map((road) => (
        <SegmentTable key={road.id} segments={road.segments} />
      ))}
      <Summary selectedRoads={selectedRoads} />
    </div>
  );
};

export default Dashboard;
