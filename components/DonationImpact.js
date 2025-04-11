import React, { useState, useEffect } from 'react';
import { FaHandHoldingHeart, FaUsers, FaMedkit, FaChartLine } from 'react-icons/fa';

const DonationImpact = () => {
  const [impactStats, setImpactStats] = useState({
    totalDonations: 0,
    peopleHelped: 0,
    medicineTypes: 0,
    totalValue: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockImpactStats = {
      totalDonations: 1250,
      peopleHelped: 450,
      medicineTypes: 35,
      totalValue: 75000
    };

    setImpactStats(mockImpactStats);
  }, []);

  const impactCards = [
    {
      icon: <FaHandHoldingHeart className="text-3xl text-red-500" />,
      title: 'Total Donations',
      value: impactStats.totalDonations,
      unit: 'medicines'
    },
    {
      icon: <FaUsers className="text-3xl text-blue-500" />,
      title: 'People Helped',
      value: impactStats.peopleHelped,
      unit: 'individuals'
    },
    {
      icon: <FaMedkit className="text-3xl text-green-500" />,
      title: 'Medicine Types',
      value: impactStats.medicineTypes,
      unit: 'varieties'
    },
    {
      icon: <FaChartLine className="text-3xl text-purple-500" />,
      title: 'Total Value',
      value: `₹${impactStats.totalValue.toLocaleString()}`,
      unit: 'worth'
    }
  ];

  return (
    <div className="donation-impact p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Donation Impact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactCards.map((card, index) => (
          <div
            key={index}
            className="impact-card p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-center mb-3">
              {card.icon}
            </div>
            <h3 className="text-lg font-medium text-center text-gray-800">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-center text-gray-900 mt-2">
              {card.value}
            </p>
            <p className="text-sm text-center text-gray-600">
              {card.unit}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Your donations are making a real difference in people's lives.
          Thank you for being part of this initiative!
        </p>
      </div>
    </div>
  );
};

export default DonationImpact;