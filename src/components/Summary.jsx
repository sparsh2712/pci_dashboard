import React from "react";

const calculateSummary = (selectedRoads, key) => {
  const summary = Array.from({ length: 5 }, (_, i) => ({
    score: i + 1,
    avgVelocity: 0,
    totalDistance: 0,
    numSegments: 0,
  }));

  selectedRoads.forEach((road) => {
    road.segments.forEach((segment) => {
      // Apply the velocity prediction rule
      const velocityPrediction =
        (segment.avg_velocity * 18) / 5 > 39
          ? 5
          : (segment.avg_velocity * 18) / 5 > 30
          ? 4
          : (segment.avg_velocity * 18) / 5 > 20
          ? 3
          : 2;

      const score = key === "velocityPrediction" ? velocityPrediction : segment[key];

      if (score >= 1 && score <= 5) {
        const group = summary[score - 1];
        group.avgVelocity =
          (group.avgVelocity * group.numSegments + (segment.avg_velocity * 18) / 5) /
          (group.numSegments + 1); // Convert velocity to km/h if needed
        group.totalDistance += segment.distance;
        group.numSegments += 1;
      }
    });
  });

  return summary;
};


const SummaryTable = ({ title, data }) => (
  <div style={{ marginBottom: "20px", }}>
    <h3>{title}</h3>
    <table>
      <thead>
        <tr>
          <th>Score</th>
          <th>Avg. Velocity</th>
          <th>Total Distance (km)</th>
          <th>Number of Segments</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.score}>
            <td>{row.score}</td>
            <td>{row.avgVelocity.toFixed(2)}</td>
            <td>{(row.totalDistance / 1000).toFixed(2)}</td>
            <td>{row.numSegments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Summary = ({ selectedRoads }) => {
  const pciSummary = calculateSummary(selectedRoads, "pci_score");
  const velocitySummary = calculateSummary(selectedRoads, "velocityPrediction");

  return (
    <div>
      <h2>Summary</h2>
      <SummaryTable title="PCI-Based Summary" data={pciSummary} />
      <SummaryTable title="Velocity-Based Summary" data={velocitySummary} />
    </div>
  );
};

export default Summary;
