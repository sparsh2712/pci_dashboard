import React, { useState } from 'react';

const DataTable = ({ data, selectedRow, onCheckboxSelect, onZoomToRoad }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice data to show only rows for the current page
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCheckboxChange = (rowData) => {
    onCheckboxSelect(rowData);
  };

  const handleZoomClick = (rowData) => {
    onZoomToRoad({ roadName: rowData.roadName, userName: rowData.userName });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Select</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Road Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={
                      selectedRow &&
                      selectedRow.date === row.date &&
                      selectedRow.userName === row.userName
                    }
                    onChange={() => handleCheckboxChange(row)}
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.date || 'N/A'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.userName || 'N/A'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.roadName || 'N/A'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button onClick={() => handleZoomClick(row)} aria-label={`Zoom to ${row.roadName}`}>
                    Zoom
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
