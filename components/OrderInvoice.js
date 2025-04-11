import React from 'react';
import { FaPrint } from 'react-icons/fa';
import '../styles/OrderInvoice.css';

const OrderInvoice = ({ orderDetails, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="invoice-container">
      <div className="invoice-content">
        <div className="invoice-header">
          <h2>Medicine Redistribution</h2>
          <div className="invoice-actions no-print">
            <button onClick={handlePrint} className="print-button">
              <FaPrint /> Print Invoice
            </button>
            <button onClick={onClose} className="close-button">
              Close
            </button>
          </div>
        </div>

        <div className="invoice-details">
          <div className="invoice-section">
            <h3>Invoice Details</h3>
            <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p><strong>Date:</strong> {formatDate(orderDetails.date)}</p>
            <p><strong>Payment ID:</strong> {orderDetails.paymentId}</p>
            <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
          </div>

          <div className="invoice-section">
            <h3>Shipping Address</h3>
            <p>{orderDetails.address.fullName}</p>
            <p>{orderDetails.address.street}</p>
            <p>{orderDetails.address.city}, {orderDetails.address.state}</p>
            <p>PIN: {orderDetails.address.pincode}</p>
            <p>Phone: {orderDetails.address.phone}</p>
            {orderDetails.address.email && <p>Email: {orderDetails.address.email}</p>}
          </div>
        </div>

        <div className="invoice-items">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="item-details">
                      <span className="item-name">{item.medicineName}</span>
                      <span className="item-manufacturer">{item.manufacturer}</span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>₹{item.finalPrice.toFixed(2)}</td>
                  <td>₹{(item.finalPrice * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{orderDetails.totalAmount}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges:</span>
            <span className="free">FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>₹{orderDetails.totalAmount}</span>
          </div>
        </div>

        <div className="invoice-footer">
          <p>Thank you for your order!</p>
          <p className="footer-note">This is a computer-generated invoice and does not require a signature.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;