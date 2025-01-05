import React, { useState, useEffect, useRef } from "react";
import DataTable from "../components/DataTable";
import MapView from "../components/MapView";
import { useRoadContext } from "../context/RoadContext";
import { fetchJourneys } from "../services/api"; 

const Dashboard = () => {
  const { updateRoadData } = useRoadContext(); // Get update function from context
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRows, setSelectedRows] = useState([]);
  const [lineColor, setLineColor] = useState('blue');
  const mapRef = useRef(null); // Reference for MapView

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchJourneys(); // Fetch data using the API function
        setData(fetchedData); // Update state with the fetched data
        updateRoadData(fetchedData); // Update the road context with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData(); // Call the function to fetch data
  }, [updateRoadData]);

  const handleCheckboxSelect = (rowData) => {
    setSelectedRows((prevState) => {
      const isAlreadySelected = prevState.some(
        (item) =>
          item.date === rowData.date &&
          item.userName === rowData.userName &&
          item.roadName === rowData.roadName
      );
      if (isAlreadySelected) {
        return prevState.filter(
          (item) =>
            !(
              item.date === rowData.date &&
              item.userName === rowData.userName &&
              item.roadName === rowData.roadName
            )
        );
      } else {
        return [...prevState, rowData];
      }
    });
  };

  const handleZoomToSelectedRoads = () => {
    if (!mapRef.current) {
      console.error("Map reference is not defined.");
      return;
    }

    const allCoordinates = selectedRows.flatMap((row) =>
      row.segments.flatMap((segment) => segment.coordinates)
    );

    if (allCoordinates.length === 0) {
      console.warn("No coordinates found for the selected roads.");
      return;
    }

    const bounds = allCoordinates.map(([lat, lng]) => [lat, lng]);

    try {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      console.log("Map zoom adjusted to the selected roads' bounds.");
    } catch (error) {
      console.error("Error while adjusting map zoom:", error);
    }
    };

  const handleZoomToRoad = (roadKey) => {
    const { roadName, userName } = roadKey;

    if (!roadName || !userName) {
      console.warn("Invalid road key. Missing roadName or userName.");
      return;
    }

    const selectedRoad = data.find(
      (item) => item.roadName === roadName && item.userName === userName
    );

    if (!selectedRoad) {
      console.warn("No road data found for the selected key.");
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

    if (!mapRef.current) {
      console.error("Map reference is not defined.");
      return;
    }

    try {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      console.log("Map zoom adjusted to the selected road bounds.");
    } catch (error) {
      console.error("Error while adjusting map zoom:", error);
    }
  };

  const processSegments = (segments) => {
    let totalDistance = 0;
    return segments.map((segment, index) => {
      const from = totalDistance;
      const to = from + segment.distance;
      totalDistance = to;

      const pciPrediction = segment.pci_score;

      let velocityPrediction = "";
      if ((segment.avg_velocity * 18) / 5 > 39) {
        velocityPrediction = "5";
      } else if ((segment.avg_velocity * 18) / 5 > 30) {
        velocityPrediction = "4";
      } else if ((segment.avg_velocity * 18) / 5 > 20) {
        velocityPrediction = "3";
      } else if ((segment.avg_velocity * 18) / 5 > 10) {
        velocityPrediction = "2";
      }

      return {
        segmentNum: index + 1,
        avgVelocity: (segment.avg_velocity * 18) / 5,
        from: from.toFixed(2) / 1000,
        to: to.toFixed(2) / 1000,
        distance: segment.distance.toFixed(2) / 1000,
        pciPrediction,
        velocityPrediction,
      };
    });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: '10px' }}>
      <label style={{ marginRight: '10px' }}>
        <input
          type="radio"
          value="blue"
          checked={lineColor === 'blue'}
          onChange={() => setLineColor('blue')}
        />
        Blue Lines
      </label>
      <label>
        <input
          type="radio"
          value="red"
          checked={lineColor === 'red'}
          onChange={() => setLineColor('red')}
        />
        Red Lines
      </label>
    </div>
    <MapView ref={mapRef} lineColor={lineColor} />

    <h2 style={{ marginTop: "30px" }}>Data Table</h2>

      <div style={{ marginTop: '20px' }}>
        <DataTable
          data={data}
          selectedRows={selectedRows}
          onCheckboxSelect={handleCheckboxSelect}
          onZoomToRoad={handleZoomToRoad} // Pass zoom handler to DataTable
        />
      </div>
      <div style={{ marginTop: '20px' }}>
  <button onClick={handleZoomToSelectedRoads}>Zoom to Selected Roads</button>
</div>


      <div style={{ marginTop: '20px' }}>
        {selectedRows.map((row) => (
          <div key={row.date}>
            <h3>{row.roadName} - {row.date}</h3>
            <button onClick={() => handleZoomToRoad({ roadName: row.roadName, userName: row.userName })}>
              Zoom to Road
            </button>
            <table>
              <thead>
                <tr>
                  <th>Segment Num</th>
                  <th>Avg Velocity</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Distance (km)</th>
                  <th>PCI Prediction</th>
                  <th>Velocity Prediction</th>
                </tr>
              </thead>
              <tbody>
                {processSegments(row.segments).map((segment) => (
                  <tr key={segment.segmentNum}>
                    <td>{segment.segmentNum}</td>
                    <td>{segment.avgVelocity}</td>
                    <td>{segment.from}</td>
                    <td>{segment.to}</td>
                    <td>{segment.distance}</td>
                    <td>{segment.pciPrediction}</td>
                    <td>{segment.velocityPrediction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
