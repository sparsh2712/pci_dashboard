const Summary = ({ selectedRoads }) => (
  <div>
    <h3>Summary</h3>
    <ul>
      {selectedRoads.map(road => (
        <li key={road.id}>{road.name}: {road.summary}</li>
      ))}
    </ul>
  </div>
);

export default Summary;
