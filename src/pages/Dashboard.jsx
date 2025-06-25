import React, { useState, useEffect, useRef } from "react";
import DataTable from "../components/DataTable";
import MapView from "../components/MapView";
import { useRoadContext } from "../context/RoadContext";
import { fetchJourneys } from "../services/api";
import Summary from "../components/Summary";
import Login from "./login";
import { useNavigate } from 'react-router-dom';
import iitblogo from '../assets/iitblogo.jpeg'
import zplogo from '../assets/zplogo.jpeg'


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { updateRoadData } = useRoadContext(); // Get update function from context
  const [data, setData] = useState([]); // State to store fetched data
  const [selectedRows, setSelectedRows] = useState([]);
  const [pciType, setPciType] = useState('pciBased');
  const mapRef = useRef(null); // Reference for MapView
  const [searchUsername, setSearchUsername] = React.useState("");
  const [searchRoadName, setSearchRoadName] = React.useState("");
  const defaultStartDate = "2020-01-01";
  const defaultEndDate = "2050-12-31";
  const [selectedStartDate, setStartDate] = useState(defaultStartDate);
  const navigate = useNavigate();
  const [selectedEndDate, setEndDate] = useState(defaultEndDate);
  const [submittedInputs, setSubmittedInputs] = useState({
    searchUsername: "",
    searchRoadName: "",
    selectedStartDate: null,
    selectedEndDate: null,
  });


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const fetchedData = await fetchJourneys(); // Fetch data using the API function
  //       setData(fetchedData); // Update state with the fetched data
  //       updateRoadData(fetchedData); // Update the road context with the fetched data
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getData(); // Call the function to fetch data
  // }, [updateRoadData]);

  useEffect(() => {
  const getData = async () => {
    try {
      setLoading(true);  // start loading
      const fetchedData = await fetchJourneys();
      console.log("data:",fetchedData)
      setData(fetchedData);
      updateRoadData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  getData();
}, []);

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

  const showSelectedLayers = () => {
    if (!mapRef.current) {
      console.error("Map reference is not defined.");
      return;
    }

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        if (layer.getTooltip()) {
          layer.closeTooltip();
        }
      }
    });

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
      mapRef.current.fitBounds(bounds, { padding: [100, 100] });
      console.log("Map zoom adjusted to the selected road bounds.");

      // Tooltip will be placed at the first coordinate of the first segment
      const startCoordinate = roadCoordinates[0]; // First coordinate
      const tooltipContent = `
          <strong>Road Name:</strong> ${roadName} <br />
          <strong>User Name:</strong> ${userName} <br />
          <strong>Date:</strong> ${selectedRoad.date} <br />
          <strong>Segments:</strong> ${selectedRoad.segments.length} <br />
          <strong>Average Velocity:</strong> ${selectedRoad.segments[0].avg_velocity * 18 / 5} km/h
        `;

      // Create and display the tooltip at the start of the line
      const tooltip = L.tooltip()
        .setLatLng(startCoordinate)
        .setContent(tooltipContent)
        .openOn(mapRef.current);

    } catch (error) {
      console.error("Error while adjusting map zoom:", error);
    }
  };

  const handleSubmit = () => {
    setSubmittedInputs({
      searchUsername,
      searchRoadName,
      selectedStartDate,
      selectedEndDate,
    });
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
      } else {
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

  const showAllRoads = () => {
    if (!mapRef.current) {
      console.error("Map reference is not defined.");
      return;
    }

    // Clear all selected rows
    setSelectedRows([]);

    const allCoordinates = data.flatMap((row) =>
      row.segments.flatMap((segment) => segment.coordinates)
    );

    if (allCoordinates.length === 0) {
      console.warn("No coordinates found for the roads.");
      return;
    }

    const bounds = allCoordinates.map(([lat, lng]) => [lat, lng]);

    try {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      console.log("Map zoom adjusted to show all roads.");
    } catch (error) {
      console.error("Error while adjusting map zoom:", error);
    }
  };


  return (
    <div style={{ padding: "10px", textAlign: "center", maxWidth: "100vw" }}>
      <button style={{ position: "absolute", right: "60px", top: "10px" }} onClick={() => navigate('/login')}>Log Out</button>
      <div style={{height:"50px"}}></div>
      <div style={{display: "flex", alignItems: "center", justifyContent:"space-evenly"}}>
        <img src={iitblogo} alt="IITB Logo" style={{ width: "110px", height: "110px", borderRadius: "50%" }} />
        <h1>Pavement Condition Index (PCI) Dashboard</h1>
        <img src={zplogo} alt="Zilla Parishad Logo" style={{ width: "120px", height: "120px", borderRadius: "50%" }} />
      </div>
      <h3 style={{ fontWeight: "200", fontSize:"20px", fontStyle:"italic" }}>- IITB Unnat Maharashtra Abhiyan in collaboration with Zilla Parishad, Ratnagiri</h3>
      <div style={{ height: "50px" }}></div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value="pciBased"
            checked={pciType === 'pciBased'}
            onChange={() => setPciType('pciBased')}
          />
          PCI Based
        </label>
        <label>
          <input
            type="radio"
            value="velocityBased"
            checked={pciType === 'velocityBased'}
            onChange={() => setPciType('velocityBased')}
          />
          Velocity Based
        </label>
      </div>
      <div style={{ display: "flex", flexDirection: "row", maxWidth: "97vw" }}>
        <div style={{ padding: "20px", paddingTop: "0", margin: "20px", marginLeft: "0", marginTop: "0", display: "flex", flexDirection: "column", gap: "10px", }} >
          <div style={{ display: "flex", width: "40vw", flexDirection: "row", justifyContent: "space-evenly" }}>
            <input
              type="text"
              placeholder="Search Username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              style={{ padding: "10px", width: "35%" }}
            />
            <input
              type="text"
              placeholder="Search Road Name"
              value={searchRoadName}
              onChange={(e) => setSearchRoadName(e.target.value)}
              style={{ padding: "10px", width: "35%" }}
            />
            <input
              type="date"
              placeholder="Start Date"
              value={selectedStartDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ padding: "10px", width: "20%" }}
            />
            <input
              type="date"
              placeholder="End Date"
              value={selectedEndDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ padding: "10px", width: "20%" }}
            />
          </div>
          <div>
            <button style={{ width: "100px", borderColor: "#3b3b3b", marginTop: "10px", }} onClick={handleSubmit} >SUBMIT</button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <DataTable
              InputuserName={submittedInputs.searchUsername}
              InputRoadName={submittedInputs.searchRoadName}
              InputStartDate={submittedInputs.selectedStartDate}
              InputEndDate={submittedInputs.selectedEndDate}
              data={data}
              selectedRows={selectedRows}
              onCheckboxSelect={handleCheckboxSelect}
              onZoomToRoad={handleZoomToRoad}
              loading={loading}   
            />
          </div>
          <div style={{ marginTop: '20px' }}>
            <button style={{ marginRight: '20px' }} onClick={showSelectedLayers}>Show Selected Roads</button>
            <button onClick={showAllRoads}>Show All Roads</button>
          </div>
        </div>
        <MapView ref={mapRef} pciType={pciType} displayedRoads={selectedRows} />
      </div>

      <div style={{ marginTop: '20px' }}>
        {selectedRows.map((row) => (
          <div key={row.date}>
            <h3>{row.roadName} - {row.date}</h3>
            <button onClick={() => handleZoomToRoad({ roadName: row.roadName, userName: row.userName })} style={{ marginRight: "10px" }}>
              Zoom to Road
            </button>
            <button
              onClick={async () => {
                try {
                  const response = await fetch("https://pcibackend.xyz/download_report", {
                    method: "GET",
                    headers: {
                      "Roadname": row.roadName,
                    },
                  });

                  if (!response.ok) {
                    throw new Error("Failed to download report");
                  }

                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "report.pdf";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                } catch (error) {
                  console.error("Error downloading report:", error);
                  alert("Failed to download the report.");
                }
              }}
            >
              Download Report
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
                  {/* <th>Velocity Prediction</th>
                  <th>Min Prediction</th> */}
                </tr>
              </thead>
              <tbody>
                {processSegments(row.segments).map((segment) => (
                  <tr key={segment.segmentNum}>
                    <td>{segment.segmentNum}</td>
                    <td>{segment.avgVelocity.toFixed(2)}</td>
                    <td>{segment.from.toFixed(3).replace('.', '/')}</td>
                    <td>{segment.to.toFixed(3).replace('.', '/')}</td>
                    <td>{segment.distance.toFixed(3)}</td>
                    <td>{segment.pciPrediction}</td>
                    {/* <td>{segment.velocityPrediction}</td>
                    <td>{Math.min(segment.pciPrediction, segment.velocityPrediction)}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Summary selectedRoads={selectedRows} />
      </div>
    </div>
  );
};

export default Dashboard;
