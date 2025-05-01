import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';

const TimesheetTable = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/timesheet');
      setTimesheets(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching timesheet data');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Timesheet Entries</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Description</th>
            <th>Project ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet._id}>
              <td>{timesheet.userId}</td>
              <td>{new Date(timesheet.date).toLocaleDateString()}</td>
              <td>{timesheet.hours}</td>
              <td>{timesheet.description}</td>
              <td>{timesheet.projectId}</td>
              <td>{timesheet.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TimesheetTable; 