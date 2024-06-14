import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminManagementWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios'; 
import AdminDetailsWindow from "./AdminDetailsWindow";
import { FaBars } from 'react-icons/fa';

const AdminManagementWindow = () => {
  const [admins, setAdmins] = useState([
    { adminId: 1, adminName: 'Shop 1', adminRole: 'Role 1' },
    { adminId: 2, adminName: 'Shop 2', adminRole: 'Role 2' },
    { adminId: 3, adminName: 'Shop 3', adminRole: 'Role 3' },
    { adminId: 4, adminName: 'Shop 4', adminRole: 'Role 4' },
    { adminId: 5, adminName: 'Shop 5', adminRole: 'Role 5' },
    { adminId: 6, adminName: 'Shop 6', adminRole: 'Role 6' },
    { adminId: 7, adminName: 'Shop 7', adminRole: 'Role 7' },
    { adminId: 8, adminName: 'Shop 8', adminRole: 'Role 8' },
    { adminId: 9, adminName: 'Shop 9', adminRole: 'Role 9' },
    { adminId: 10, adminName: 'Shop 10', adminRole: 'Role 10' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8095/admin/getAdmin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  

  // const [acceptedReservations, setAcceptedReservations] = useState([]);

  // // useEffect to upreservationDate local storage when acceptedReservations changes
  // useEffect(() => {
  //   localStorage.setItem(
  //     "acceptedReservations",
  //     JSON.stringify(acceptedReservations)
  //   );
  //   localStorage.setItem(
  //     "shops",
  //     JSON.stringify(shops)
  //   );
  // }, [acceptedReservations]);

  
  
  

  // const handleAccept = (adminId) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to accept this reservation?"
  //   );
  //   if (confirmed) {
  //     const acceptedReservation = reservationRequests.find(
  //       (reservation) => reservation.id === adminId
  //     );
  //     setAcceptedReservations((prevAcceptedReservations) => [
  //       ...prevAcceptedReservations,
  //       acceptedReservation,
  //     ]);
  //     setReservationRequests(
  //       reservationRequests.filter((reservation) => reservation.id !== adminId)
  //     );
  //     console.log(acceptedReservation);
  //   }
  // };

  // const handleDelete = (adminId) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this reservation?"
  //   );
  //   if (confirmed) {
  //     setReservationRequests(
  //       reservationRequests.filter((reservation) => reservation.id !== adminId)
  //     );
  //   }
  // };

  const [selectedadminId, setSelectedadminId] = useState(null);

  const handleSelectedShopClick = (adminId) => {
    setSelectedadminId(adminId);
    localStorage.setItem(
      "admins",
      JSON.stringify(admins)
    );
    <Link to={"/AdminDetails"}></Link>;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div className="admin-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="admin-management-content">
        <h2 className="admin-management-heading">Admin Management</h2>
        {selectedadminId ? (
          <div className="component-div-admin">
            <AdminDetailsWindow adminId={selectedadminId} />
          </div>
        ) : (
    
        admins.length === 0 ? (
          <p className="admin-management-no-shops">No admins found.</p>
        ) : (
          <div className="admin-list">
            {admins.map((admin) => (
              <div key={admin.adminId} className="admin-item">
                <p>
                  <strong>Admin Name:</strong> {admin.adminName}
                </p>
                <p>
                  <strong>Admin Role:</strong> {admin.adminRole}
                </p>
                {/* <p>
                  <strong>View Details:</strong>
                  <Link to={`/shop/${shop.adminId}`}>View Details</Link>
                </p> */}
                <div className="button-container-3">
                <button className='view-admin'
                    onClick={() => handleSelectedShopClick(admin.adminId)}
                  >
                    View Admin
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}

             
      </div>

     

      <RightSidebar />
    </div>
  );
};

export default AdminManagementWindow;
