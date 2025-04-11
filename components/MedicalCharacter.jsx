import React, { useState } from 'react';
import '../styles/character.css';

const MedicalCharacter = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = [
    "Hi there! Need help finding medicines?",
    "You can donate unused medicines to help others!",
    "Check out our health categories for specific needs!",
    "Upload your prescription for quick assistance!",
    "Stay healthy and help others stay healthy too!"
  ];

  const handleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="medical-character" onClick={handleClick}>
      {showMessage && (
        <div className={`character-message ${showMessage ? 'show' : ''}`}>
          {currentMessage}
        </div>
      )}
      <div className="character-head">
        <div className="character-face">
          <div className="character-eye left"></div>
          <div className="character-eye right"></div>
          <div className="character-smile"></div>
        </div>
      </div>
      <div className="character-body"></div>
    </div>
  );
};

export default MedicalCharacter;