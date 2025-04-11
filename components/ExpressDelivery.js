import { useState } from "react";

export default function ExpressDelivery() {
  const [pincode, setPincode] = useState("");
  const [estimate, setEstimate] = useState("");

  const fetchEstimate = async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=YourLocation&destinations=${pincode}&key=YOUR_GOOGLE_API_KEY`);
    const data = await response.json();
    setEstimate(data.rows[0].elements[0].duration.text);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <button onClick={fetchEstimate}>Check Delivery Time</button>
      {estimate && <p>Estimated Delivery: {estimate}</p>}
    </div>
  );
}
