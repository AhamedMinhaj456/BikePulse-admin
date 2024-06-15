import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './LeftSidebar.css';
import bikePulseLogo from '../../assets/logo.png';
import ShopManagementIcon from '../../assets/Shop.svg';
import UserManagementIcon from '../../assets/UserManagement.svg';
import SubscriptionIcon from '../../assets/Subscription.svg';
import FaultIcon from '../../assets/Category.svg';
import AccountSettingIcon from '../../assets/Settings.svg';
import ServiceIcon from '../../assets/Service.svg';
import PaymentManagementIcon from '../../assets/payment.svg';
import ProfileIcon from '../../assets/User.svg';
import Account_Setting_Icon from '../../assets/account_setting.svg';
import ChatSettingIcon from '../../assets/chat.svg';

const LeftSidebar = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div >
      <div className="logo-container">
        <img src={bikePulseLogo} alt="BikePulse Logo" className="logo-website" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      <div className="divider"></div>
      <div className="white-box">
        <Link to="/shop-management" className="list-item">
          <img src={ShopManagementIcon} alt="Shop" />
          <span>Shop Management</span>
        </Link>

        <Link to="/user-management" className="list-item">
          <img src={UserManagementIcon} alt="UserManagement" />
          <span>User Management</span>
        </Link>

        <Link to="/AdminManagementWindow" className="list-item">
          <img src={UserManagementIcon} alt="UserManagement" />
          <span>Admin Management</span>
        </Link>

        <Link to="/payment-management" className="list-item">
          <img src={PaymentManagementIcon} alt="PaymentManagement" />
          <span>Payment Management</span>
        </Link>

        <Link to="/subscription-plans" className="list-item">
          <img src={SubscriptionIcon} alt="Subscription" />
          <span>Subscription Plans Management</span>
        </Link>

        <Link to="/service-plans" className="list-item">
          <img src={ServiceIcon} alt="Service" />
          <span>Service Plans Management</span>
        </Link>

        <Link to="/fault-management" className="list-item">
          <img src={FaultIcon} alt="FaultCategory" />
          <span>Fault Category Management</span>
        </Link>

        <div className="list-item dropdown" onClick={toggleDropdown}>
          <img src={Account_Setting_Icon} alt="Account & Setting" />
          <span>Account & Setting</span>
          {isDropdownOpen ? (
            <FaChevronUp className="dropdown-icon" />
          ) : (
            <FaChevronDown className="dropdown-icon" />
          )}
        </div>

        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/profile" className="list-item">
              <img src={ProfileIcon} alt="Profile" />
              <span>Profile</span>
            </Link>
            <Link to="/account-setting" className="list-item">
              <img src={AccountSettingIcon} alt="Account Setting" />
              <span>Account Setting</span>
            </Link>
            <Link to="/chat-setting" className="list-item">
              <img src={ChatSettingIcon} alt="Chat Setting" />
              <span>Chat Setting</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default LeftSidebar;
