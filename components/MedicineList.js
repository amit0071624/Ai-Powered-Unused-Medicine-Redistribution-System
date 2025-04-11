import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MedicineList = () => {
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/medicines")
            .then((response) => response.json())
            .then((data) => setMedicines(data))
            .catch((error) => console.error("Error fetching medicines:", error));
    }, []);

    const handleBuy = (medicine) => {
        navigate('/order-checkout', { state: { medicine } });
    };

    return (
        <div>
            <h2>Available Medicines</h2>
            <ul>
                {medicines.map((medicine) => (
                    <li key={medicine.id}>
                        <img src={medicine.image_url} alt={medicine.name} width="100" />
                        <h3>{medicine.name}</h3>
                        <p>{medicine.description}</p>
                        <p>Price: ₹{medicine.price}</p>
                        <button onClick={() => handleBuy(medicine)}>Buy Now</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MedicineList;
