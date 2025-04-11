import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Card, Row, Col, Form } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = ({ donationData, distributionData, timeRange, onTimeRangeChange }) => {
  const donationChartData = {
    labels: ['Antibiotics', 'Pain Relief', 'Cardiovascular', 'Diabetes', 'Others'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const trendChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Donations',
        data: [65, 59, 80, 81],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1
      },
      {
        label: 'Distributions',
        data: [28, 48, 40, 19],
        fill: false,
        borderColor: '#FF6384',
        tension: 0.1
      },
      {
        label: 'Requests',
        data: [35, 58, 70, 45],
        fill: false,
        borderColor: '#FFCE56',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="analytics-container">
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Time Range</Form.Label>
            <Form.Select value={timeRange} onChange={onTimeRangeChange}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Medicine Donations by Category</Card.Title>
              <div style={{ height: '300px' }}>
                <Pie data={donationChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Medicine Distribution Trends</Card.Title>
              <div style={{ height: '300px' }}>
                <Line data={trendChartData} options={{ maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;