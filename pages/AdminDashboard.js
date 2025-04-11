import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { adminPermissions } from '../config/adminConfig';
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Alert,
  Spinner,
  Modal,
  Badge,
  Nav
} from 'react-bootstrap';
import { FaUsers, FaPills, FaShoppingCart, FaChartLine, FaChartBar } from 'react-icons/fa';
import Analytics from '../components/Analytics';

const AdminDashboard = () => {
  // Temporary bypass authentication for development
  const user = { role: 'admin' }; // Mock admin user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('weekly');
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  
  // Data states
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMedicines: 0,
    totalOrders: 0,
    revenue: 0
  });
  const [medicineRequests, setMedicineRequests] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Modal states
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Error boundary
  const ErrorFallback = ({ error }) => (
    <Alert variant="danger">
      <Alert.Heading>Something went wrong</Alert.Heading>
      <p>{error.message}</p>
    </Alert>
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for development
      const mockStats = {
        totalUsers: 150,
        totalMedicines: 75,
        totalOrders: 320,
        revenue: 15750
      };

      const mockMedicines = [
        { id: 1, name: 'Aspirin', type: 'Pain Relief', quantity: 500, price: 9.99 },
        { id: 2, name: 'Amoxicillin', type: 'Antibiotic', quantity: 200, price: 24.99 },
        { id: 3, name: 'Lisinopril', type: 'Blood Pressure', quantity: 0, price: 19.99 },
        { id: 4, name: 'Metformin', type: 'Diabetes', quantity: 350, price: 14.99 }
      ];

      const mockUsers = [
       
        { id: 4, name: 'Aarav Patel', email: 'aarav.patel@example.com', role: 'user', isActive: true },
        { id: 5, name: 'Diya Sharma', email: 'diya.sharma@example.com', role: 'user', isActive: true },
        { id: 6, name: 'Arjun Kumar', email: 'arjun.kumar@example.com', role: 'user', isActive: true },
        { id: 7, name: 'Zara Singh', email: 'zara.singh@example.com', role: 'user', isActive: false },
        { id: 8, name: 'Vihaan Reddy', email: 'vihaan.reddy@example.com', role: 'user', isActive: true },
        { id: 9, name: 'Ananya Gupta', email: 'ananya.gupta@example.com', role: 'user', isActive: true },
        { id: 10, name: 'Kabir Malhotra', email: 'kabir.malhotra@example.com', role: 'user', isActive: true },
        { id: 11, name: 'Ishaan Verma', email: 'ishaan.verma@example.com', role: 'user', isActive: true },
        { id: 12, name: 'Aisha Kapoor', email: 'aisha.kapoor@example.com', role: 'user', isActive: true },
        { id: 13, name: 'Advait Choudhury', email: 'advait.choudhury@example.com', role: 'user', isActive: false },
        { id: 14, name: 'Myra Joshi', email: 'myra.joshi@example.com', role: 'user', isActive: true },
        { id: 15, name: 'Reyansh Mehra', email: 'reyansh.mehra@example.com', role: 'user', isActive: true },
        { id: 16, name: 'Kiara Saxena', email: 'kiara.saxena@example.com', role: 'user', isActive: true },
        { id: 17, name: 'Vivaan Rao', email: 'vivaan.rao@example.com', role: 'user', isActive: true },
        { id: 18, name: 'Anika Desai', email: 'anika.desai@example.com', role: 'user', isActive: false },
        { id: 19, name: 'Dhruv Iyer', email: 'dhruv.iyer@example.com', role: 'user', isActive: true },
        { id: 20, name: 'Saanvi Nair', email: 'saanvi.nair@example.com', role: 'user', isActive: true },
        { id: 21, name: 'Arnav Mehta', email: 'arnav.mehta@example.com', role: 'user', isActive: true },
        { id: 22, name: 'Riya Bhat', email: 'riya.bhat@example.com', role: 'user', isActive: true },
        { id: 23, name: 'Yuvan Menon', email: 'yuvan.menon@example.com', role: 'user', isActive: true },
        { id: 24, name: 'Avni Shetty', email: 'avni.shetty@example.com', role: 'user', isActive: false },
        { id: 25, name: 'Krish Agarwal', email: 'krish.agarwal@example.com', role: 'user', isActive: true },
        { id: 26, name: 'Shanaya Pillai', email: 'shanaya.pillai@example.com', role: 'user', isActive: true },
        { id: 27, name: 'Ved Khanna', email: 'ved.khanna@example.com', role: 'user', isActive: true },
        { id: 28, name: 'Tara Banerjee', email: 'tara.banerjee@example.com', role: 'user', isActive: true },
        { id: 29, name: 'Shaurya Chopra', email: 'shaurya.chopra@example.com', role: 'user', isActive: false },
        { id: 30, name: 'Ira Basu', email: 'ira.basu@example.com', role: 'user', isActive: true },
        { id: 31, name: 'Ayaan Mukherjee', email: 'ayaan.mukherjee@example.com', role: 'user', isActive: true },
        { id: 32, name: 'Kyra Sengupta', email: 'kyra.sengupta@example.com', role: 'user', isActive: true },
        { id: 33, name: 'Veer Ganguly', email: 'veer.ganguly@example.com', role: 'user', isActive: true },
        { id: 34, name: 'Mira Chatterjee', email: 'mira.chatterjee@example.com', role: 'user', isActive: false },
        { id: 35, name: 'Atharv Das', email: 'atharv.das@example.com', role: 'user', isActive: true },
        { id: 36, name: 'Navya Roy', email: 'navya.roy@example.com', role: 'user', isActive: true },
        { id: 37, name: 'Kabir Bhattacharya', email: 'kabir.bhattacharya@example.com', role: 'user', isActive: true },
        { id: 38, name: 'Aadhya Mishra', email: 'aadhya.mishra@example.com', role: 'user', isActive: true },
        { id: 39, name: 'Rudra Sinha', email: 'rudra.sinha@example.com', role: 'user', isActive: false },
        { id: 40, name: 'Pihu Ghosh', email: 'pihu.ghosh@example.com', role: 'user', isActive: true },
        { id: 41, name: 'Aadi Trivedi', email: 'aadi.trivedi@example.com', role: 'user', isActive: true },
        { id: 42, name: 'Sara Dutta', email: 'sara.dutta@example.com', role: 'user', isActive: true },
        { id: 43, name: 'Aryan Rathore', email: 'aryan.rathore@example.com', role: 'user', isActive: true },
        { id: 44, name: 'Ahana Malik', email: 'ahana.malik@example.com', role: 'user', isActive: false },
        { id: 45, name: 'Shivansh Bajaj', email: 'shivansh.bajaj@example.com', role: 'user', isActive: true },
        { id: 46, name: 'Prisha Mathur', email: 'prisha.mathur@example.com', role: 'user', isActive: true },
        { id: 47, name: 'Aarush Chauhan', email: 'aarush.chauhan@example.com', role: 'user', isActive: true },
        { id: 48, name: 'Anvi Bedi', email: 'anvi.bedi@example.com', role: 'user', isActive: true },
        { id: 49, name: 'Yash Ranganathan', email: 'yash.ranganathan@example.com', role: 'user', isActive: false },
        { id: 50, name: 'Aditi Venkatesh', email: 'aditi.venkatesh@example.com', role: 'user', isActive: true },
        { id: 51, name: 'Rishaan Krishnan', email: 'rishaan.krishnan@example.com', role: 'user', isActive: true },
        { id: 52, name: 'Avantika Hegde', email: 'avantika.hegde@example.com', role: 'user', isActive: true },
        { id: 53, name: 'Viraj Subramaniam', email: 'viraj.subramaniam@example.com', role: 'user', isActive: true },
        { id: 54, name: 'Amaira Naidu', email: 'amaira.naidu@example.com', role: 'user', isActive: false },
        { id: 55, name: 'Advaith Menon', email: 'advaith.menon@example.com', role: 'user', isActive: true },
        { id: 56, name: 'Siya Ramakrishnan', email: 'siya.ramakrishnan@example.com', role: 'user', isActive: true },
        { id: 57, name: 'Reyansh Nambiar', email: 'reyansh.nambiar@example.com', role: 'user', isActive: true },
        { id: 58, name: 'Pari Iyengar', email: 'pari.iyengar@example.com', role: 'user', isActive: true },
        { id: 59, name: 'Vihaan Sundaram', email: 'vihaan.sundaram@example.com', role: 'user', isActive: false },
        { id: 60, name: 'Anaya Krishnamurthy', email: 'anaya.krishnamurthy@example.com', role: 'user', isActive: true },
        { id: 61, name: 'Kabir Gopalakrishnan', email: 'kabir.gopalakrishnan@example.com', role: 'user', isActive: true },
        { id: 62, name: 'Zara Ramaswamy', email: 'zara.ramaswamy@example.com', role: 'user', isActive: true },
        { id: 63, name: 'Arjun Padmanabhan', email: 'arjun.padmanabhan@example.com', role: 'user', isActive: true },
        { id: 64, name: 'Myra Venkatesan', email: 'myra.venkatesan@example.com', role: 'user', isActive: false },
        { id: 65, name: 'Ishaan Chandrasekhar', email: 'ishaan.chandrasekhar@example.com', role: 'user', isActive: true },
        { id: 66, name: 'Aisha Parthasarathy', email: 'aisha.parthasarathy@example.com', role: 'user', isActive: true },
        { id: 67, name: 'Advait Rajagopalan', email: 'advait.rajagopalan@example.com', role: 'user', isActive: true },
        { id: 68, name: 'Kiara Srikanth', email: 'kiara.srikanth@example.com', role: 'user', isActive: true },
        { id: 69, name: 'Vivaan Raghavan', email: 'vivaan.raghavan@example.com', role: 'user', isActive: false },
        { id: 70, name: 'Anika Swaminathan', email: 'anika.swaminathan@example.com', role: 'user', isActive: true },
        { id: 71, name: 'Dhruv Thirumalai', email: 'dhruv.thirumalai@example.com', role: 'user', isActive: true },
        { id: 72, name: 'Saanvi Viswanathan', email: 'saanvi.viswanathan@example.com', role: 'user', isActive: true },
        { id: 73, name: 'Arnav Ramamurthy', email: 'arnav.ramamurthy@example.com', role: 'user', isActive: true },
        { id: 74, name: 'Riya Natarajan', email: 'riya.natarajan@example.com', role: 'user', isActive: false },
        { id: 75, name: 'Yuvan Lakshmanan', email: 'yuvan.lakshmanan@example.com', role: 'user', isActive: true },
        { id: 76, name: 'Avni Seshadri', email: 'avni.seshadri@example.com', role: 'user', isActive: true },
        { id: 77, name: 'Krish Kalyanaraman', email: 'krish.kalyanaraman@example.com', role: 'user', isActive: true },
        { id: 78, name: 'Shanaya Rangarajan', email: 'shanaya.rangarajan@example.com', role: 'user', isActive: true },
        { id: 79, name: 'Ved Vasudevan', email: 'ved.vasudevan@example.com', role: 'user', isActive: false },
        { id: 80, name: 'Tara Krishnaswamy', email: 'tara.krishnaswamy@example.com', role: 'user', isActive: true },
        { id: 81, name: 'Shaurya Narayanan', email: 'shaurya.narayanan@example.com', role: 'user', isActive: true },
        { id: 82, name: 'Ira Venkataraman', email: 'ira.venkataraman@example.com', role: 'user', isActive: true },
        { id: 83, name: 'Ayaan Subramanian', email: 'ayaan.subramanian@example.com', role: 'user', isActive: true },
        { id: 84, name: 'Kyra Ramachandran', email: 'kyra.ramachandran@example.com', role: 'user', isActive: false },
        { id: 85, name: 'Veer Ananthakrishnan', email: 'veer.ananthakrishnan@example.com', role: 'user', isActive: true },
        { id: 86, name: 'Mira Balasubramaniam', email: 'mira.balasubramaniam@example.com', role: 'user', isActive: true },
        { id: 87, name: 'Atharv Chandran', email: 'atharv.chandran@example.com', role: 'user', isActive: true },
        { id: 88, name: 'Navya Gopinath', email: 'navya.gopinath@example.com', role: 'user', isActive: true },
        { id: 89, name: 'Kabir Ramanathan', email: 'kabir.ramanathan@example.com', role: 'user', isActive: false },
        { id: 90, name: 'Aadhya Srinivasan', email: 'aadhya.srinivasan@example.com', role: 'user', isActive: true },
        { id: 91, name: 'Rudra Venkatraman', email: 'rudra.venkatraman@example.com', role: 'user', isActive: true },
        { id: 92, name: 'Pihu Ayyar', email: 'pihu.ayyar@example.com', role: 'user', isActive: true },
        { id: 93, name: 'Aadi Krishnamoorthy', email: 'aadi.krishnamoorthy@example.com', role: 'user', isActive: true },
        { id: 94, name: 'Sara Iyer', email: 'sara.iyer@example.com', role: 'user', isActive: false },
        { id: 95, name: 'Aryan Gopal', email: 'aryan.gopal@example.com', role: 'user', isActive: true },
        { id: 96, name: 'Ahana Rajesh', email: 'ahana.rajesh@example.com', role: 'user', isActive: true },
        { id: 97, name: 'Shivansh Suresh', email: 'shivansh.suresh@example.com', role: 'user', isActive: true },
        { id: 98, name: 'Prisha Mahesh', email: 'prisha.mahesh@example.com', role: 'user', isActive: true },
        { id: 99, name: 'Aarush Ramesh', email: 'aarush.ramesh@example.com', role: 'user', isActive: false },
        { id: 100, name: 'Anvi Dinesh', email: 'anvi.dinesh@example.com', role: 'user', isActive: true },
        { id: 101, name: 'Yash Ganesh', email: 'yash.ganesh@example.com', role: 'user', isActive: true },
        { id: 102, name: 'Aditi Prakash', email: 'aditi.prakash@example.com', role: 'user', isActive: true },
        { id: 103, name: 'Rishaan Kumar', email: 'rishaan.kumar@example.com', role: 'user', isActive: true }
      ];

      const mockOrders = [
        { id: 1, customerName: 'Jane Smith', date: '2024-01-15', total: 49.98, status: 'completed' },
        { id: 2, customerName: 'Bob Wilson', date: '2024-01-16', total: 74.97, status: 'pending' },
        { id: 3, customerName: 'Alice Brown', date: '2024-01-17', total: 29.99, status: 'cancelled' }
      ];

      const mockMedicineRequests = [
        { id: 1, userId: 4, userName: 'Aarav Patel', medicineName: 'Aspirin', quantity: 2, status: 'PENDING', requestDate: '2024-01-18' },
        { id: 2, userId: 5, userName: 'Diya Sharma', medicineName: 'Amoxicillin', quantity: 1, status: 'PENDING', requestDate: '2024-01-18' },
        { id: 3, userId: 6, userName: 'Arjun Kumar', medicineName: 'Lisinopril', quantity: 3, status: 'PENDING', requestDate: '2024-01-17' }
      ];

      setStats(mockStats);
      setMedicines(mockMedicines);
      setUsers(mockUsers);
      setOrders(mockOrders);
      setMedicineRequests(mockMedicineRequests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMedicineUpdate = async (medicineId, data) => {
    try {
      await axios.put(`http://localhost:8080/api/medicines/${medicineId}`, data);
      await fetchDashboardData();
      setShowMedicineModal(false);
    } catch (err) {
      console.error('Error updating medicine:', err);
      setError(err.message);
    }
  };

  const handleAddMedicine = async (medicineData) => {
    try {
      await axios.post('http://localhost:8080/api/medicines', medicineData);
      await fetchDashboardData();
      setShowAddMedicineModal(false);
    } catch (err) {
      console.error('Error adding medicine:', err);
      setError(err.message);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.post(`http://localhost:8080/api/medicine-requests/${requestId}/${action}`);
      // Refresh the requests after action
      const updatedRequests = medicineRequests.map(request => {
        if (request.id === requestId) {
          return { ...request, status: action.toUpperCase() };
        }
        return request;
      });
      setMedicineRequests(updatedRequests);
    } catch (err) {
      setError(`Failed to ${action} request`);
    }
  };

  const handleUserUpdate = async (userId, data) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, data);
      await fetchDashboardData();
      setShowUserModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <ErrorFallback error={{ message: error }} />;
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Welcome, {user?.email}</h2>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Users</Card.Title>
                  <h3>{stats.totalUsers}</h3>
                </div>
                <FaUsers size={24} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Medicines</Card.Title>
                  <h3>{stats.totalMedicines}</h3>
                </div>
                <FaPills size={24} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Orders</Card.Title>
                  <h3>{stats.totalOrders}</h3>
                </div>
                <FaShoppingCart size={24} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Revenue</Card.Title>
                  <h3>${stats.revenue}</h3>
                </div>
                <FaChartLine size={24} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'medicines'}
                    onClick={() => setActiveTab('medicines')}
                  >
                    Medicines
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'users'}
                    onClick={() => setActiveTab('users')}
                  >
                    Users
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'orders'}
                    onClick={() => setActiveTab('orders')}
                  >
                    Orders
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'analytics'}
                    onClick={() => setActiveTab('analytics')}
                  >
                    Analytics
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'requests'}
                    onClick={() => setActiveTab('requests')}
                  >
                    Medicine Requests
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {activeTab === 'medicines' && (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map(medicine => (
                      <tr key={medicine.id}>
                        <td>{medicine.name}</td>
                        <td>{medicine.type}</td>
                        <td>{medicine.quantity}</td>
                        <td>${medicine.price}</td>
                        <td>
                          <Badge bg={medicine.quantity > 0 ? 'success' : 'danger'}>
                            {medicine.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setSelectedMedicine(medicine);
                              setShowMedicineModal(true);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {activeTab === 'analytics' && (
                <Analytics
                  timeRange={timeRange}
                  onTimeRangeChange={(e) => setTimeRange(e.target.value)}
                />
              )}

              {activeTab === 'users' && (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Badge bg={user.isActive ? 'success' : 'secondary'}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {activeTab === 'requests' && (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>User</th>
                      <th>Medicine</th>
                      <th>Quantity</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicineRequests.map(request => (
                      <tr key={request.id}>
                        <td>#{request.id}</td>
                        <td>{request.userName}</td>
                        <td>{request.medicineName}</td>
                        <td>{request.quantity}</td>
                        <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={
                            request.status === 'ACCEPTED' ? 'success' :
                            request.status === 'REJECTED' ? 'danger' : 'warning'
                          }>
                            {request.status}
                          </Badge>
                        </td>
                        <td>
                          {request.status === 'PENDING' && (
                            <div className="d-flex gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleRequestAction(request.id, 'accept')}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRequestAction(request.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {activeTab === 'orders' && (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>${order.total}</td>
                        <td>
                          <Badge bg={
                            order.status === 'completed' ? 'success' :
                            order.status === 'pending' ? 'warning' : 'danger'
                          }>
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Medicine Edit Modal */}
      <Modal show={showMedicineModal} onHide={() => setShowMedicineModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedMedicine?.name || ''}
                onChange={(e) => setSelectedMedicine({
                  ...selectedMedicine,
                  name: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={selectedMedicine?.price || ''}
                onChange={(e) => setSelectedMedicine({
                  ...selectedMedicine,
                  price: parseFloat(e.target.value)
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={selectedMedicine?.quantity || ''}
                onChange={(e) => setSelectedMedicine({
                  ...selectedMedicine,
                  quantity: parseInt(e.target.value)
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMedicineModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleMedicineUpdate(selectedMedicine.id, selectedMedicine)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Edit Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.name || ''}
                onChange={(e) => setSelectedUser({
                  ...selectedUser,
                  name: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({
                  ...selectedUser,
                  email: e.target.value
                })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={selectedUser?.role || ''}
                onChange={(e) => setSelectedUser({
                  ...selectedUser,
                  role: e.target.value
                })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Active"
                checked={selectedUser?.isActive || false}
                onChange={(e) => setSelectedUser({
                  ...selectedUser,
                  isActive: e.target.checked
                })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUserUpdate(selectedUser.id, selectedUser)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;