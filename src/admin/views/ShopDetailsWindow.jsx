import React, { useState, useEffect } from "react";
import "./ShopDetailsWindow.css";
import { Link } from "react-router-dom";
import LeftSidebar from "../common/LeftSidebar";
import RightSidebar from "../common/RightSidebar";
import axios from 'axios';
import Switch from 'react-switch';
import { FaBars } from 'react-icons/fa';

const ShopDetailsWindow = ({ shopId }) => {
  const [shopDetails, setShopDetails] = useState({
    shopId: 5,
    shopName: "John Doe",
    shopAddress: "MB 1234",
    contactNumber: "123-456-7890",
    email: "shop@abc.com",
    taxId: "TAX-1234",
    subscriptionPlan: "Month Plan",
  });

  useEffect(() => {
    const storedShops = localStorage.getItem(
      "shops"
    );
    if (storedShops) {
      const parsedShops = JSON.parse(storedShops);
      const foundShop = parsedShops.find(
        (shop) => shop.shopId === shopId
      );
      if (foundShop) {
        setShopDetails(foundShop);
      }
    }
  }, [shopId]);

  const [activeStatus, setActiveStatus] = useState(false); // false means "deactive", true means "active"
  const [approvedStatus, setApprovedStatus] = useState('');
  const [currentStatus, setCurrentStatus] = useState({ activeStatus: '', approvedStatus: '' });

  useEffect(() => {
    if (shopId) {
      fetchUserStatus();
    }
  }, [shopId]);

  useEffect(() => {
    if (shopId && currentStatus.activeStatus !== '') {
      const status = activeStatus ? 'active' : 'deactive';
      axios.put(`http://localhost:8095/shop/${shopId}/active-status`, null, {
        params: { activeStatus: status }
      }).then(() => {
      });
    }
  }, [activeStatus]);

  useEffect(() => {
    if (shopId && currentStatus.approvedStatus !== '') {
      axios.put(`http://localhost:8095/shop/${shopId}/approved-status`, null, {
        params: { approvedStatus }
      }).then(() => {
      });
    }
  }, [approvedStatus]);

  const fetchUserStatus = async () => {
    const response = await axios.get(`http://localhost:8095/shop/${shopId}`);
    setCurrentStatus({
      activeStatus: response.data.activeStatus,
      approvedStatus: response.data.approvedStatus,
    });
    setActiveStatus(response.data.activeStatus === 'active');
    setApprovedStatus(response.data.approvedStatus);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="shop-details-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="shop-details-management-content">
        <h3>{shopDetails.shopName} Shop Details</h3>

        <div className="shop-details-item">
          <p>
            <strong>Shop ID:</strong>
            <span>{shopDetails.shopId}</span>
          </p>
          <p>
            <strong>Shop Name:</strong>
            <span>{shopDetails.shopName}</span>
          </p>
          <p>
            <strong>Shop Address:</strong>
            <span>{shopDetails.shopAddress}</span>
          </p>
          <p>
            <strong>Phone Number:</strong>
            <span>{shopDetails.contactNumber}</span>
          </p>
          <p>
            <strong>Email:</strong>
            <span>{shopDetails.email}</span>
          </p>
          <p>
            <strong>Tax Id:</strong>
            <span>{shopDetails.taxId}</span>
          </p>
          <p>
            <strong>Subscription Plan:</strong>
            <span>{shopDetails.subscriptionPlan}</span>
          </p>
        </div>

        <div className="active-status-shop">
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
        <div>
          <div className="approved-status-shop">
            <h2>Update Approved Status</h2>
            <div>
              <label>
                <input
                  type="radio"
                  value="pending"
                  checked={approvedStatus === 'pending'}
                  onChange={(e) => setApprovedStatus(e.target.value)}
                />
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  value="approved"
                  checked={approvedStatus === 'approved'}
                  onChange={(e) => setApprovedStatus(e.target.value)}
                />
                Approved
              </label>
              <label>
                <input
                  type="radio"
                  value="rejected"
                  checked={approvedStatus === 'rejected'}
                  onChange={(e) => setApprovedStatus(e.target.value)}
                />
                Rejected
              </label>
            </div>
          </div>
        </div>
        
        <Link to={"/shop-management"}>
          <button className="back-button-1"
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

export default ShopDetailsWindow;
