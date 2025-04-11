import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CartPage.css';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.finalPrice * item.quantity), 0
    ).toFixed(2);
  };

  const proceedToCheckout = () => {
    navigate('/order-checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add medicines to your cart to see them here</p>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          <AnimatePresence>
          {cartItems.map(item => (
            <motion.div
              key={item.id}
              className="cart-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="item-image">
                <img src={item.image} alt={item.medicineName} />
              </div>
              <div className="item-details">
                <h3>{item.medicineName}</h3>
                <p className="manufacturer">{item.manufacturer}</p>
                <p className="medicine-type">{item.medicineType}</p>
              </div>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  <FaMinus />
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="price-details">
                <span className="price">₹{(item.finalPrice * item.quantity).toFixed(2)}</span>
                {item.originalPrice !== item.finalPrice && (
                  <span className="original-price">₹{(item.originalPrice * item.quantity).toFixed(2)}</span>
                )}
              </div>
              <button 
                onClick={() => removeItem(item.id)} 
                className="remove-btn"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
          <button 
            onClick={proceedToCheckout}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;