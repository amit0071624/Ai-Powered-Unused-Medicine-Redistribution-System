import React from 'react';
import '../styles/PaymentOffers.css';

const PaymentOffers = () => {
  const paymentMethods = [
    { id: 1, name: 'Credit Card', offers: ['10% cashback on first purchase', 'No-cost EMI available'] },
    { id: 2, name: 'UPI', offers: ['5% instant discount', 'Extra rewards points'] },
    { id: 3, name: 'Net Banking', offers: ['Zero transaction fees', 'Instant refund on cancellation'] },
    { id: 4, name: 'Wallet', offers: ['Additional 2% cashback', 'Special festival offers'] }
  ];

  return (
    <div className="payment-offers">
      <h3 className="gradient-text">Payment Options & Offers</h3>
      <div className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <div key={method.id} className="payment-method-card glass-effect">
            <h4>{method.name}</h4>
            <ul>
              {method.offers.map((offer, index) => (
                <li key={index}>{offer}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOffers;