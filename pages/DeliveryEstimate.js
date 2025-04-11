import React from 'react';
import { motion } from 'framer-motion';
import '../styles/DeliveryEstimate.css';

const DeliveryEstimate = () => {
  const deliveryZones = [
    {
      zone: 'Zone A',
      areas: 'Central Business District, Downtown',
      estimatedTime: '24-48 hours',
      cost: '₹50'
    },
    {
      zone: 'Zone B',
      areas: 'Suburban Areas, Residential Districts',
      estimatedTime: '48-72 hours',
      cost: '₹70'
    },
    {
      zone: 'Zone C',
      areas: 'Outskirts, Rural Areas',
      estimatedTime: '72-96 hours',
      cost: '₹100'
    }
  ];

  return (
    <div className="delivery-estimate-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="delivery-estimate-content"
      >
        <h1>Delivery Time Estimation</h1>
        <p className="delivery-description">
          Get an estimate of when your medicines will reach you. Delivery times may vary based on your location
          and the availability of medicines.
        </p>

        <div className="delivery-zones">
          {deliveryZones.map((zone, index) => (
            <motion.div
              key={zone.zone}
              className="zone-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3>{zone.zone}</h3>
              <div className="zone-details">
                <p><strong>Areas Covered:</strong> {zone.areas}</p>
                <p><strong>Estimated Delivery Time:</strong> {zone.estimatedTime}</p>
                <p><strong>Delivery Cost:</strong> {zone.cost}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="delivery-notes">
          <h3>Important Notes:</h3>
          <ul>
            <li>Delivery times are approximate and may vary based on weather conditions and local circumstances.</li>
            <li>For urgent medicine requirements, please contact our customer support.</li>
            <li>Free delivery available on orders above ₹500.</li>
            <li>Track your order in real-time once dispatched.</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default DeliveryEstimate;