import { useState } from "react";
import axios from "axios";

const DeliveryEstimator = ({ visible = true }) => {
  const [pincode, setPincode] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [error, setError] = useState(null);

  if (!visible) return null;

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setPincode(value);
    setError(null);
  };

  const handleEstimate = async () => {
    if (!pincode || pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setError(null); // Clear previous errors
    setDeliveryTime("Calculating...");

    try {
      const response = await axios.get("http://localhost:8080/api/delivery-time", {
        params: { pincode }
      });
      setDeliveryTime(response.data.deliveryTime || "Unable to fetch delivery time.");
    } catch (error) {
      console.error("Error fetching delivery time:", error);
      setDeliveryTime(null);
      setError("Failed to fetch delivery time. Try again.");
    }
  };

  return (
    <div className="delivery-estimator-container" style={{ display: visible ? 'block' : 'none' }}>
      <h2>Estimate Delivery Time</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          onChange={handlePincodeChange}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
            if (e.key === 'Enter' && pincode.length === 6) {
              handleEstimate();
            }
          }}
          maxLength="6"
          pattern="[0-9]*"
          inputMode="numeric"
          aria-label="Enter your pincode"
          aria-describedby="pincode-error"
          className={error ? 'error' : ''}
        />
        <button 
          onClick={handleEstimate} 
          disabled={!pincode.trim() || pincode.length !== 6}
        >
          Check Time
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {deliveryTime && <p className="delivery-time">Estimated Time: {deliveryTime}</p>}
    </div>
  );
};

export default DeliveryEstimator;
