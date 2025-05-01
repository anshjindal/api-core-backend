import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Badge, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TimesheetTable = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const styles = {
    container: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(26, 35, 126, 0.1)',
      transition: 'all 0.3s ease',
    },
    header: {
      color: '#1A237E',
      fontSize: '2rem',
      fontWeight: '700',
      letterSpacing: '-0.5px',
      marginBottom: '0.5rem'
    },
    card: {
      backgroundColor: '#1A237E',
      backgroundImage: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
      color: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(26, 35, 126, 0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    },
    cardTitle: {
      color: '#ffffff',
      fontSize: '1.1rem',
      fontWeight: '500',
      opacity: '0.9',
      marginBottom: '0.5rem'
    },
    cardText: {
      color: '#ffffff',
      fontSize: '2.5rem',
      fontWeight: '700',
      letterSpacing: '-1px'
    },
    table: {
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: 'none'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
      color: '#ffffff',
      fontSize: '0.95rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    tableRow: {
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#f8f9ff'
      }
    },
    button: {
      borderRadius: '8px',
      padding: '0.6rem 1.2rem',
      fontWeight: '600',
      minWidth: '140px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontSize: '0.9rem'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
      border: 'none',
      boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(26, 35, 126, 0.3)'
      }
    },
    lastUpdated: {
      color: '#666',
      fontSize: '0.9rem',
      fontStyle: 'italic',
      backgroundColor: '#f8f9fa',
      padding: '0.7rem 1.2rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1.5rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      border: '1px solid #e9ecef',
      width: 'fit-content',
      marginLeft: 'auto',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#ffffff',
        transform: 'translateY(-2px)'
      }
    },
    clockIcon: {
      color: '#1A237E',
      fontSize: '1.1rem'
    },
    badge: {
      padding: '0.5rem 0.8rem',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '0.85rem',
      textTransform: 'capitalize',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    successAlert: {
      borderRadius: '8px',
      border: 'none',
      boxShadow: '0 4px 12px rgba(40, 167, 69, 0.2)',
      animation: 'slideDown 0.3s ease'
    }
  };

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/timesheet');
      console.log('API Response:', response.data);
      if (response.data.success) {
        setTimesheets(response.data.data);
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch timesheet data');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching timesheets:', err);
      setError('Error connecting to the server');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheets();

    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(fetchTimesheets, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh]);

  const getStatusBadge = (status) => {
    let variant;
    switch (status.toLowerCase()) {
      case 'approved':
        variant = 'success';
        break;
      case 'pending':
        variant = 'warning';
        break;
      case 'in progress':
        variant = 'info';
        break;
      default:
        variant = 'secondary';
    }
    return <Badge bg={variant}>{status}</Badge>;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchTimesheets();
  };

  const calculateTotalHours = () => {
    return timesheets.reduce((total, timesheet) => total + timesheet.hours, 0);
  };

  const calculateWeeklyHours = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday
    endOfWeek.setHours(23, 59, 59, 999);

    return timesheets
      .filter(timesheet => {
        const timesheetDate = new Date(timesheet.date);
        return timesheetDate >= startOfWeek && timesheetDate <= endOfWeek;
      })
      .reduce((total, timesheet) => total + timesheet.hours, 0);
  };

  const getWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return {
      start: formatDate(startOfWeek),
      end: formatDate(endOfWeek)
    };
  };

  const handleSubmitForApproval = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
        <Button variant="outline-danger" size="sm" className="ms-3" onClick={handleRefresh}>
          Try Again
        </Button>
      </Alert>
    );
  }

  return (
    <div style={styles.container} className="mt-4">
      {showSuccessMessage && (
        <Alert variant="success" className="mb-3" style={styles.successAlert}>
          Timesheet submitted for approval successfully! 🎉
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={4}>
          <Card style={styles.card}>
            <Card.Body className="p-4">
              <Card.Title style={styles.cardTitle}>Total Hours</Card.Title>
              <Card.Text style={styles.cardText}>
                {calculateTotalHours()} hrs
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={styles.header}>Timesheet Summary</h2>
        <div className="d-flex align-items-center gap-3">
          <Button 
            variant="outline-primary" 
            onClick={handleRefresh} 
            disabled={loading}
            style={{ 
              ...styles.button,
              ...styles.primaryButton
            }}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Refreshing...
              </>
            ) : (
              'Refresh'
            )}
          </Button>
          <Button
            variant={autoRefresh ? "success" : "outline-secondary"}
            onClick={() => setAutoRefresh(!autoRefresh)}
            style={{
              ...styles.button,
              backgroundColor: autoRefresh ? '#198754' : 'transparent',
              borderColor: autoRefresh ? '#198754' : '#6c757d',
              color: autoRefresh ? '#ffffff' : '#6c757d',
              boxShadow: autoRefresh ? '0 4px 12px rgba(25, 135, 84, 0.2)' : 'none'
            }}
          >
            {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitForApproval}
            style={{
              ...styles.button,
              ...styles.primaryButton
            }}
          >
            Submit for Approval
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th className="py-3">User ID</th>
            <th className="py-3">Date</th>
            <th className="py-3">Hours</th>
            <th className="py-3">Description</th>
            <th className="py-3">Project ID</th>
            <th className="py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheets && timesheets.length > 0 ? (
            timesheets.map((timesheet) => (
              <tr key={timesheet._id} style={styles.tableRow}>
                <td className="py-3">{timesheet.userId}</td>
                <td className="py-3">{formatDate(timesheet.date)}</td>
                <td className="py-3">{timesheet.hours}</td>
                <td className="py-3">{timesheet.description}</td>
                <td className="py-3">{timesheet.projectId}</td>
                <td className="py-3">
                  <Badge 
                    bg={getStatusBadge(timesheet.status).props.bg} 
                    style={styles.badge}
                  >
                    {timesheet.status}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                {loading ? (
                  <Spinner animation="border" role="status" size="sm" style={{ color: '#1A237E' }} />
                ) : (
                  'No timesheet entries found'
                )}
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: '#f8f9ff' }}>
            <td colSpan="2" className="text-end fw-bold py-3">Total Hours:</td>
            <td className="fw-bold py-3">{calculateTotalHours()}</td>
            <td colSpan="3"></td>
          </tr>
        </tfoot>
      </Table>

      <div className="mt-4">
        <Card style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          marginBottom: '1rem'
        }}>
          <Card.Body className="p-4">
            <Card.Title style={styles.cardTitle}>Weekly Hours Summary</Card.Title>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1" style={{ color: '#ffffff', opacity: '0.9' }}>
                  Week of {getWeekRange().start} to {getWeekRange().end}
                </p>
                <h3 style={{ color: '#ffffff', margin: '0' }}>
                  {calculateWeeklyHours()} hours
                </h3>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#ffffff', fontSize: '0.9rem', opacity: '0.9' }}>
                  Target Hours
                </div>
                <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  40
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="progress" style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ 
                    width: `${Math.min((calculateWeeklyHours() / 40) * 100, 100)}%`,
                    backgroundColor: '#ffffff'
                  }}
                ></div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {lastUpdated && (
        <div style={styles.lastUpdated}>
          <span role="img" aria-label="clock" style={styles.clockIcon}>🕒</span>
          Last updated: {formatDateTime(lastUpdated)}
        </div>
      )}
    </div>
  );
};

export default TimesheetTable; 