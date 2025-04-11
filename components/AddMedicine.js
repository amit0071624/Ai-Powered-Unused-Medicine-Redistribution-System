import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMedicine = () => {
    const navigate = useNavigate();
    const [medicineData, setMedicineData] = useState({
        medicineName: '',
        medicineType: '',
        quantity: '',
        expiryDate: '',
        purpose: 'Sell',
        image: 'https://via.placeholder.com/150'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to add medicine');
                navigate('/login');
                return;
            }

            const response = await fetch('http://localhost:8080/api/medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(medicineData)
            });

            if (!response.ok) {
                throw new Error('Failed to save medicine');
            }

            alert('Medicine added successfully');
            navigate('/');
        } catch (error) {
            console.error('Error adding medicine:', error);
            alert('Failed to add medicine. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMedicineData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Add New Medicine</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Medicine Name:</label>
                    <input
                        type="text"
                        name="medicineName"
                        value={medicineData.medicineName}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                    />
                </div>
                
                <div>
                    <label>Medicine Type:</label>
                    <input
                        type="text"
                        name="medicineType"
                        value={medicineData.medicineType}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                    />
                </div>
                
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={medicineData.quantity}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                    />
                </div>
                
                <div>
                    <label>Expiry Date:</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={medicineData.expiryDate}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                    />
                </div>
                
                <div>
                    <label>Purpose:</label>
                    <select
                        name="purpose"
                        value={medicineData.purpose}
                        onChange={handleInputChange}
                        style={inputStyle}
                    >
                        <option value="Sell">Sell</option>
                        <option value="Donate">Donate</option>
                    </select>
                </div>
                
                <button type="submit" style={buttonStyle}>Add Medicine</button>
            </form>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
};

const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
};

export default AddMedicine;