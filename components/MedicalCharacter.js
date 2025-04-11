import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const CharacterContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  cursor: pointer;
`;

const Character = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: #24aeb1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: max-content;
  max-width: 250px;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
`;

const MedicalCharacter = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');

  const messages = [
    'Need help logging in? Click the "Login" button at the top right!',
    'Looking to buy medicine? Use the search bar above or browse categories below.',
    'Want to donate medicines? Click the "Share & Care" button!',
    'Need to upload a prescription? Click the "Upload Prescription" button!'
  ];

  const handleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setTooltipMessage(randomMessage);
    setShowTooltip(true);

    // Hide tooltip after 3 seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  return (
    <CharacterContainer onClick={handleClick}>
      <AnimatePresence>
        {showTooltip && (
          <Tooltip
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {tooltipMessage}
          </Tooltip>
        )}
      </AnimatePresence>
      <Character
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        👨‍⚕️
      </Character>
    </CharacterContainer>
  );
};

export default MedicalCharacter;