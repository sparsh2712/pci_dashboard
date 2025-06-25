import React from "react";

const DataTable = ({ InputuserName, InputRoadName, InputEndDate, InputStartDate, data, selectedRows, onCheckboxSelect, onZoomToRoad, loading }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchUsername, setSearchUsername] = React.useState("");
  const [searchRoadName, setSearchRoadName] = React.useState("");
  const rowsPerPage = 10;

  const filteredData = data.filter((row) => {
    const usernameMatch = row.userName
      ?.toLowerCase()
      .includes(InputuserName.toLowerCase());
    const roadNameMatch = row.roadName
      ?.toLowerCase()
      .includes(InputRoadName.toLowerCase());
    const dateMatch =
      !InputStartDate || !InputEndDate
        ? true // No date filter applied if both fields are empty
        : new Date(row.date) >= new Date(InputStartDate) &&
        new Date(row.date) <= new Date(InputEndDate);
    return usernameMatch && roadNameMatch && dateMatch;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));;

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCheckboxChange = (rowData) => {
    onCheckboxSelect(rowData);
  };

  const isRowSelected = (rowData) => {
    return selectedRows.some(
      (row) =>
        row.date === rowData.date &&
        row.userName === rowData.userName &&
        row.roadName === rowData.roadName
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <table style={{ width: "40vw", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd", width: "2%" }}>
              Select
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width: "15%" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width: "8%" }}>
              Username
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd", width: "5%" }}>
              Road Name
            </th>
            {/* <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Actions
            </th> */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Loading data...
              </td>
            </tr>
          ) : currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={`${row.date}-${row.userName}-${row.roadName}`}>
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
                {/* <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() =>
                      onZoomToRoad({
                        roadName: row.roadName,
                        userName: row.userName,
                      })
                    }
                    aria-label={`Zoom to ${row.roadName}`}
                  >
                    Zoom
                  </button>
                </td> */}
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
