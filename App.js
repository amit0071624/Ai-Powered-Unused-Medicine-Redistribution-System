import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrderCheckout from "./pages/OrderCheckout";
import SellDonate from "./pages/SellDonate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import "./App.css";
import About from "./pages/About";
import MapComponent from "./components/MapComponent";
import DeliveryEstimator from "./components/DeliveryEstimator";
import MedicineList from "./components/MedicineList";
import AddMedicine from "./components/AddMedicine";
import CategoryPage from "./pages/CategoryPage";
import MedicinesPage from "./pages/MedicinesPage";
import WellnessPage from "./pages/WellnessPage";
import LabTestsPage from "./pages/LabTestsPage";
import UploadPrescription from "./pages/UploadPrescription";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import SearchResults from './pages/SearchResults';
import DonationRequest from './pages/DonationRequest';
import DeliveryEstimate from './pages/DeliveryEstimate';
import DiscussPage from './pages/DiscussPage';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
      <NotificationProvider>
        <div className="app-wrapper">
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/order-checkout" element={<ProtectedRoute element={<OrderCheckout />} />} />
            <Route path="/sell-donate" element={<ProtectedRoute element={<SellDonate />} />} />
            <Route path="/add-medicine" element={<ProtectedRoute element={<AddMedicine />} />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/lab-tests" element={<LabTestsPage />} />
            <Route path="/upload-prescription" element={<ProtectedRoute element={<UploadPrescription />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
            <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
            <Route path="/delivery-estimate" element={<ProtectedRoute element={<DeliveryEstimate />} />} />
            <Route path="/donation-request" element={<ProtectedRoute element={<DonationRequest />} />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/discuss" element={<DiscussPage />} />
          </Routes>
        </div>
        

        <ChatBot />
        <Footer />
      </div>
      </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

