import React, { useState } from "react";

const DataTable = ({ data, onCheckboxSelect, onZoomToRoad }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchRoadName, setSearchRoadName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  const filteredData = data.filter((row) => {
    const usernameMatch = row.userName
      ?.toLowerCase()
      .includes(searchUsername.toLowerCase());
    const roadNameMatch = row.roadName
      ?.toLowerCase()
      .includes(searchRoadName.toLowerCase());
    return usernameMatch && roadNameMatch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCheckboxChange = (rowData) => {
    const isSelected = selectedRows.some(
      (row) => row.date === rowData.date && row.userName === rowData.userName
    );

    let newSelectedRows;
    if (isSelected) {
      newSelectedRows = selectedRows.filter(
        (row) =>
          !(row.date === rowData.date && row.userName === rowData.userName)
      );
    } else {
      newSelectedRows = [...selectedRows, rowData];
    }

    setSelectedRows(newSelectedRows);
    onCheckboxSelect(rowData);
  };

  const isRowSelected = (rowData) => {
    return selectedRows.some(
      (row) => row.date === rowData.date && row.userName === rowData.userName
    );
  };

  const handleZoomClick = (rowData) => {
    onZoomToRoad({ roadName: rowData.roadName, userName: rowData.userName });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search Username"
          value={searchUsername}
          onChange={(e) => {
            setSearchUsername(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Search Road Name"
          value={searchRoadName}
          onChange={(e) => {
            setSearchRoadName(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: "5px" }}
        />
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Select
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Username
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Road Name
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isRowSelected(row)}
                    onChange={() => handleCheckboxChange(row)}
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {row.date || "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {row.userName || "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {row.roadName || "N/A"}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleZoomClick(row)}
                    aria-label={`Zoom to ${row.roadName}`}
                  >
                    Zoom
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
