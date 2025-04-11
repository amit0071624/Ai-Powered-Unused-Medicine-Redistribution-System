import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { getChatbotResponse, getFaqQuestions } from '../services/aiService';
import '../styles/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [faqQuestions, setFaqQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setFaqQuestions(getFaqQuestions());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Send welcome message when chat is opened for the first time
      const welcomeMessage = {
        type: 'bot',
        content: 'Hello! I\'m MedBot, your medical assistant. How can I help you today?'
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage.trim()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get bot response
      const response = await getChatbotResponse(userMessage.content);
      const botMessage = {
        type: 'bot',
        content: response.message
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: 'Sorry, I\'m having trouble responding right now. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat toggle button */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>MedBot Assistant</h3>
            <button 
              className="faq-toggle"
              onClick={() => setShowFaq(!showFaq)}
              aria-label="Toggle FAQ"
            >
              FAQ
            </button>
          </div>

          {showFaq && (
            <div className="faq-container">
              <h4>Frequently Asked Questions</h4>
              {faqQuestions.map((faq, index) => (
                <div key={index} className="faq-item" onClick={() => {
                  setShowFaq(false);
                  setInputMessage(faq.question);
                  handleSubmit(new Event('submit'));
                }}>
                  {faq.question}
                </div>
              ))}
            </div>
          )}
          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;