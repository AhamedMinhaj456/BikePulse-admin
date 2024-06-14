import React, { useState, useEffect } from 'react';
import './AdminProfileWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const AdminProfileWindow = () => {
    const [profileData, setProfileData] = useState({
        username: 'admin',
        email: 'admin@example.com',
        profileImage: null,
    });

    // State to store activity log
    const [activityLog, setActivityLog] = useState([
        // Default activity log items
        { action: 'Logged in at 09:00 AM', date: 'April 20, 2024 09:00 AM' },
        { action: 'Updated profile information', date: 'April 20, 2024 09:15 AM' },
        { action: 'Logged in at 10:30 AM', date: 'April 19, 2024 10:30 AM' },
    ]);

    useEffect(() => {
        // Fetch activity log data from the backend when component mounts
        // Backend developer will implement this part
        // fetchActivityLog().then((data) => {
        //     setActivityLog(data);
        // });
    }, []);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log('Profile updated:', profileData);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        console.log('Password changed');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({
                    ...profileData,
                    profileImage: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to log activity
    const logActivity = (activity) => {
        // Send activity data to backend for logging in the database
        // Backend developer will implement this part
        // logActivityToBackend(activity).then(() => {
        //     setActivityLog([...activityLog, activity]);
        // });
    };

    // Sample activity logging
    const logSampleActivity = () => {
        const sampleActivity = {
            action: 'Sample activity',
            date: new Date().toLocaleString(),
        };
        logActivity(sampleActivity);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="admin-profile-window">
            <div className="hamburger-icon" onClick={toggleSidebar}>
                <FaBars />
            </div>

            <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <LeftSidebar />
            </div>

            <div className="admin-profile-content">
                <h2 className="admin-profile-title">Admin Profile</h2>

                <div className="profile-sections-container">

                    <div className="profile-section">
                        <h3 className="section-title">Update Profile</h3>
                        <div className="section-box">
                            <form className="profile-form" onSubmit={handleProfileUpdate}>
                                <label className="profile-label">Profile Image:</label>
                                {profileData.profileImage && (
                                    <img src={profileData.profileImage} alt="Admin" className="admin-image" />
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="image-input" />
                                <label className="profile-label">Username:</label>
                                <input
                                    type="text"
                                    value={profileData.username}
                                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                    className="username-input"
                                />

                                <label className="profile-label">Email:</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="email-input"
                                />

                                <button type="submit" className="update-profile">Update Profile</button>
                            </form>
                        </div>
                    </div>

                    <div className="password-section">
                        <h3 className="section-title">Change Password</h3>
                        <div className="section-box">
                            <form className="password-form" onSubmit={handlePasswordChange}>
                                <label className="password-label">Current Password:</label>
                                <input type="password" className="input" />
                                <label className="password-label">New Password:</label>
                                <input type="password" className="input" />
                                <label className="password-label">Confirm New Password:</label>
                                <input type="password" className="input" />
                                <button type="submit" className="change-password">Change Password</button>
                            </form>
                        </div>
                    </div>

                    <div className="activity-log">
                        <h3 className="section-title">Activity Log</h3>
                        <div className="section-box">
                            {activityLog.map((item, index) => (
                                <div key={index} className="log-item">
                                    <p>{item.action}</p>
                                    <p className="log-date">{item.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <RightSidebar />
        </div>
    );
};

export default AdminProfileWindow;
