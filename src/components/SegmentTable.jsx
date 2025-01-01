const SegmentTable = ({ segments }) => (
  <table>
    <thead>
      <tr>
        <th>Segment</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
      {segments.map((segment, index) => (
        <tr key={index}>
          <td>{segment.name}</td>
          <td>{segment.data}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SegmentTable;
