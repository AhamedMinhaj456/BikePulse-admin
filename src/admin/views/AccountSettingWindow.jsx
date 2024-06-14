import React, { useState } from 'react';
import './AccountSettingWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import { FaBars } from 'react-icons/fa';

const AccountSettingWindow = () => {
  const [accountSettings, setAccountSettings] = useState({
    notification: true,
    darkMode: false,
    textFontSize: 'medium',
    fontPreference: 'sans-serif',
    highContrastMode: false,
    keyboardShortcuts: true,
    dataExport: true,
    dataDeletionRequests: true,
    connectedDevices: [],
    appPreferences: {
      darkMode: false,
      theme: 'default',
    },
  });

  const handleAccountSettingsUpdate = (e) => {
    e.preventDefault();
    console.log('Account settings updated:', accountSettings);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div className="account-setting-window">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="account-setting-content">
        <h2>Account Settings</h2>

        <form className="account-setting-form" onSubmit={handleAccountSettingsUpdate}>

          <div className="setting-box">
            <h3>Accessibility Settings</h3>
            <label>
              <input
                type="checkbox"
                checked={accountSettings.notification}
                onChange={(e) =>
                  setAccountSettings({ ...accountSettings, notification: e.target.checked })
                }
              />
              Receive Notifications
            </label>

            <label>
              <input
                type="checkbox"
                checked={accountSettings.darkMode}
                onChange={(e) => setAccountSettings({ ...accountSettings, darkMode: e.target.checked })}
              />
              Dark Mode
            </label>

            <label>
              <select
                value={accountSettings.textFontSize}
                onChange={(e) => setAccountSettings({ ...accountSettings, textFontSize: e.target.value })}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              Text Size
            </label>

            <label>
              <select
                value={accountSettings.fontPreference}
                onChange={(e) => setAccountSettings({ ...accountSettings, fontPreference: e.target.value })}
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
              Font Preference
            </label>

            <label>
              <input
                type="checkbox"
                checked={accountSettings.highContrastMode}
                onChange={(e) => setAccountSettings({ ...accountSettings, highContrastMode: e.target.checked })}
              />
              High Contrast Mode
            </label>

            <label>
              <input
                type="checkbox"
                checked={accountSettings.keyboardShortcuts}
                onChange={(e) => setAccountSettings({ ...accountSettings, keyboardShortcuts: e.target.checked })}
              />
              Keyboard Shortcuts
            </label>
          </div>

          <div className="setting-box">
            <h3>Data Management Settings</h3>
            <label>
              <input
                type="checkbox"
                checked={accountSettings.dataExport}
                onChange={(e) => setAccountSettings({ ...accountSettings, dataExport: e.target.checked })}
              />
              Data Export
            </label>

            <label>
              <input
                type="checkbox"
                checked={accountSettings.dataDeletionRequests}
                onChange={(e) => setAccountSettings({ ...accountSettings, dataDeletionRequests: e.target.checked })}
              />
              Data Deletion Requests
            </label>
          </div>

          <button type="submit" className='setting-button'>Save Settings</button>
        </form>
      </div>

      <RightSidebar />
    </div>
  );
};

export default AccountSettingWindow;
