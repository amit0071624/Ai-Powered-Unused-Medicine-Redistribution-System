import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useNotifications } from '../contexts/NotificationContext';

const MedicineCard = ({ medicine = {} }) => {
  const { addNotification } = useNotifications();
  if (!medicine) return null;

  const {
    image = '',
    medicineName = '',
    manufacturer = '',
    medicineType = '',
    quantity = '',
    expiryDate = '',
    originalPrice = 0,
    finalPrice = 0,
    discountPercentage = 0,
    purpose = 'Sell',
    description = ''
  } = medicine;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="medicine-card"
    >
      <div className="medicine-image">
        <img src={image} alt={medicineName} />
        <button className="wishlist-btn">
          <FaHeart />
        </button>
      </div>
      <div className="medicine-info">
        <h3 className="medicine-name">{medicineName}</h3>
        <p className="medicine-manufacturer">{manufacturer}</p>
        <div className="medicine-details">
          <div className="medicine-type-qty">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{medicineType}</span>
          </div>
          <div className="medicine-type-qty">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{quantity}</span>
          </div>
          <div className="medicine-expiry">
            <span className="detail-label">Expires:</span>
            <span className="detail-value">{expiryDate}</span>
          </div>
        </div>
        <div className="medicine-description">
          <span className="detail-label">Description:</span>
          <p className="detail-value">{description}</p>
        </div>
        <div className="medicine-price-section">
          <div className="price-details">
            <span className="original-price">
              ₹{originalPrice.toFixed(2)}
            </span>
            {discountPercentage > 0 && (
              <span className="discount-percentage">
                {discountPercentage}% off
              </span>
            )}
            <span className="final-price">
              ₹{finalPrice.toFixed(2)}
            </span>
          </div>
          <button 
            className={`cart-btn ${purpose === 'Donate' ? 'donate' : ''}`}
            onClick={() => {
              if (purpose === 'Donate') {
                const donationRequest = {
                  id: medicine.id || Math.random().toString(36).substr(2, 9),
                  medicineName,
                  manufacturer,
                  medicineType,
                  image,
                  status: 'Pending'
                };
                const existingRequests = JSON.parse(localStorage.getItem('donationRequests') || '[]');
                const updatedRequests = [...existingRequests, donationRequest];
                localStorage.setItem('donationRequests', JSON.stringify(updatedRequests));

                addNotification({
                  type: 'request',
                  title: 'Donation Request',
                  message: `Your request for ${medicineName} has been sent to the donor`,
                  medicineId: medicine.id,
                  requestType: 'donate'
                });

                window.location.href = '/donation-request';
              } else {
                const cartItem = {
                  id: medicine.id || Math.random().toString(36).substr(2, 9),
                  medicineName,
                  manufacturer,
                  medicineType,
                  quantity: 1,
                  image,
                  originalPrice,
                  finalPrice
                };
                const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                const updatedCart = [...existingCart, cartItem];
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                window.location.href = '/cart';
              }
            }}
          >
            <FaShoppingCart />
            <span>{purpose === 'Donate' ? 'REQUEST' : 'ADD'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

MedicineCard.propTypes = {
  medicine: PropTypes.shape({
    medicineName: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    medicineType: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    finalPrice: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number,
    purpose: PropTypes.oneOf(['Sell', 'Donate']).isRequired,
    onAddToCart: PropTypes.func.isRequired
  }).isRequired
};

export default MedicineCard;

