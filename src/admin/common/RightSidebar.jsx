import React from 'react';
import { Link } from 'react-router-dom';
import './RightSidebar.css';
import notificationIcon from '../../assets/notifications.svg';
import chatIcon from '../../assets/chat.svg';
import userIcon from '../../assets/User.svg';
import settingIcon from '../../assets/Settings.svg';
import logoutIcon from '../../assets/logout.svg';

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <Link to="/profile" className="icon-link">
        <img className="icon" src={userIcon} alt="User" />
      </Link>
      <img className="icon" src={notificationIcon} alt="Notification" />

      <Link to="/chat-setting" className="icon-link">
        <img className="icon" src={chatIcon} alt="Chat" />
      </Link>
      <Link to="/account-setting" className="icon-link">
        <img className="icon" src={settingIcon} alt="Setting" />
      </Link>
      <Link to="/" className="icon-link">
        <img className="icon" src={logoutIcon} alt="Logout" />
      </Link>
    </div>
  );
};

export default RightSidebar;
