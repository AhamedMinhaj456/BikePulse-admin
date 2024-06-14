import React, { useState, useEffect } from "react";
import "./CustomerDetailsWindow.css";
import { Link } from "react-router-dom";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import axios from 'axios';
import Switch from 'react-switch';
import { FaBars } from 'react-icons/fa';

const CustomerDetailsWindow = ({ customerId }) => {


  const [customerDetails, setCustomerDetails] = useState({
    customerId: 5,
    customerName: "John Doe",
    customerUsername: "TAX-1234",
    customerPhoneNumber: "123-456-7890",
    customerEmail: "customer@abc.com",


  });

  useEffect(() => {
    // Fetch reservation details here
    // Retrieve Customers from local storage
    const storedCustomers = localStorage.getItem(
      "customers"
    );
    if (storedCustomers) {
      const parsedCustomers = JSON.parse(storedCustomers);
      const foundCustomer = parsedCustomers.find(
        (customer) => customer.customerId === customerId
      );
      if (foundCustomer) {
        setCustomerDetails(foundCustomer);
      }
    }
  }, [customerId]);


  // active status

  const [activeStatus, setActiveStatus] = useState(false); // false means "deactive", true means "active"
  const [currentStatus, setCurrentStatus] = useState({ activeStatus: '' });

  useEffect(() => {
    if (customerId) {
      fetchUserStatus();
    }
  }, [customerId]);

  useEffect(() => {
    if (customerId && currentStatus.activeStatus !== '') {
      const status = activeStatus ? 'active' : 'deactive';
      axios.put(`http://localhost:8095/customer/${customerId}/active-status`, null, {
        params: { activeStatus: status }
      }).then(() => {
        // alert(`Active status updated to ${status}`);
      });
    }
  }, [activeStatus]);


  const fetchUserStatus = async () => {
    const response = await axios.get(`http://localhost:8095/customer/${customerId}`);
    setCurrentStatus({
      activeStatus: response.data.activeStatus,

    });
    setActiveStatus(response.data.activeStatus);

  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="customer-details-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="customer-details-management-content">
        <h3>{customerDetails.customerName} Customer Details</h3>

          <div className="customer-details-item">
            <p>
              <strong>Customer ID:</strong>
              <span>{customerDetails.customerId}</span>
            </p>
            <p>
              <strong>Customer Name:</strong>
              <span>{customerDetails.customerName}</span>
            </p>
            <p>
              <strong>Customer Username:</strong>
              <span>{customerDetails.customerUsername}</span>
            </p>
            <p>
              <strong>Phone Number:</strong>
              <span>{customerDetails.customerPhoneNumber}</span>
            </p>
            <p>
              <strong>customerEmail:</strong>
              <span>{customerDetails.customerEmail}</span>
            </p>
          </div>

          <div className="active-status-customer">
            <h2>Update Active Status</h2>
            <label>
              <span>Deactive</span>
              <Switch
                checked={activeStatus}
                onChange={setActiveStatus}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={48}
              />
              <span>Active</span>
            </label>
        </div>

        <Link to={"/user-management"}>
          <button
            className="back-button-2"
            onClick={() => window.location.reload()}
          >
            Back
          </button>
        </Link>
      </div>

      <RightSidebar />
    </div>
  );
};

export default CustomerDetailsWindow;
