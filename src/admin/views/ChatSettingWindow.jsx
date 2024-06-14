import React, { useState } from 'react';
import './ChatSettingWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const ChatSettingWindow = () => {
  const [chatSettings, setChatSettings] = useState({
    notifications: true,
    sound: true,
    chatInbox: true,
    unreadMessages: true,
    deletedMessages: false,
  });

  // Default messages for each section
  const defaultMessages = {
    inbox: [
      { sender: 'John', messages: ['Hi there!', 'How are you?'], time: '9:00 AM' },
      { sender: 'Alice', messages: ['Hello!', 'Nice to meet you.'], time: '10:00 AM' },
    ],
    sent: [
      { recipient: 'Bob', messages: ['Hey!', 'What\'s up?'], time: '11:00 AM' },
      { recipient: 'Emma', messages: ['Hi!', 'How are you doing?'], time: '12:00 PM' },
    ],
    draft: [
      { recipient: 'Dave', messages: ['Meeting agenda', 'Please review it.'], time: '2:00 PM' },
      { recipient: 'Grace', messages: ['Project proposal', 'Take a look at it.'], time: '3:00 PM' },
    ],
    outbox: [
      { recipient: 'Alex', messages: ['Check this out!', 'Let me know what you think.'], time: '4:00 PM' },
      { recipient: 'Olivia', messages: ['New updates', 'Please review them.'], time: '5:00 PM' },
    ],
  };

  // State to track expanded message
  const [expandedMessage, setExpandedMessage] = useState(null);

  const handleChatSettingsUpdate = (e) => {
    e.preventDefault();
    console.log('Chat settings updated:', chatSettings);
  };

  const toggleExpandedMessage = (index) => {
    if (expandedMessage === index) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(index);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div className="chat-setting-window">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="chat-setting-content">
        <h2>Chatbox</h2>

        <div className="chat-setting-sections-container">

          {Object.keys(defaultMessages).map((section, index) => (
            <div key={index} className="chat-setting-section">
              <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
              <div className="chat-box">
                {defaultMessages[section].map((msg, msgIndex) => (
                  <div key={msgIndex} className="chat-message" onClick={() => toggleExpandedMessage(msgIndex)}>
                    <p className="sender">{msg.sender || msg.recipient}</p>
                    {expandedMessage === msgIndex && (
                      <div className="expanded-details">
                        {msg.messages.map((message, i) => (
                          <p key={i} className="message">{message}</p>
                        ))}
                        <p className="time">{msg.time}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>

      <RightSidebar />
    </div>
  );
};

export default ChatSettingWindow;
