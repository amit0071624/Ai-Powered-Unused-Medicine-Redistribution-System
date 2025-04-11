import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [listedMedicines, setListedMedicines] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    // Simulated user data (Replace with real authentication data)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {
            name: "John Doe",
            email: "johndoe@example.com",
        };
        setUser(storedUser);

        // Fetch user's listed medicines
        const storedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
        setListedMedicines(storedMedicines);

        // Fetch order history
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrderHistory(storedOrders);
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            <h2 className={styles.welcomeTitle}>Welcome to Your Dashboard</h2>

            {/* User Profile Section */}
            <div className={styles.profileCard}>
                <h3 className={styles.profileTitle}>User Profile</h3>
                <p className={styles.profileInfo}><strong>Name:</strong> {user?.name}</p>
                <p className={styles.profileInfo}><strong>Email:</strong> {user?.email}</p>
            </div>

            {/* Quick Actions */}
            <div className={styles.actionButtons}>
                <button className={`${styles.actionButton} ${styles.sellButton}`} onClick={() => window.location.href = "/selldonate"}>
                    📦 Sell/Donate Medicine
                </button>
                <button className={`${styles.actionButton} ${styles.viewButton}`} onClick={() => window.location.href = "/order-checkout"}>
                    🛒 View Orders
                </button>
            </div>

            {/* Listed Medicines */}
            <h3 className={styles.welcomeTitle}>Your Listed Medicines</h3>
            {listedMedicines.length > 0 ? (
                <div className={styles.medicineGrid}>
                    {listedMedicines.map((medicine, index) => (
                        <div key={index} className={styles.medicineCard}>
                            <img src={medicine.image} alt={medicine.medicineName} className={styles.medicineImage} />
                            <h4 className={styles.medicineName}>{medicine.medicineName}</h4>
                            <p className={styles.medicineDetail}><strong>Type:</strong> {medicine.medicineType}</p>
                            <p className={styles.medicineDetail}><strong>Quantity:</strong> {medicine.quantity}</p>
                            <p className={styles.medicineDetail}><strong>Expiry:</strong> {medicine.expiryDate}</p>
                            <p className={styles.medicineDetail}><strong>Purpose:</strong> {medicine.purpose}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No medicines listed.</p>
            )}

            {/* Order History */}
            <div className={styles.orderHistory}>
                <h3 className={styles.welcomeTitle}>Order History</h3>
                {orderHistory.length > 0 ? (
                    <ul className={styles.orderList}>
                        {orderHistory.map((order, index) => (
                            <li key={index} className={styles.orderItem}>
                                🛍️ Ordered: {order.medicineName} (Qty: {order.quantity}) on {order.date}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders placed yet.</p>
                )}
            </div>
        </div>
    );
};



export default Dashboard;
