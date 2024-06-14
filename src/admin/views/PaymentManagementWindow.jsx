import React, { useState, useEffect } from 'react';
import './PaymentManagementWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const PaymentManagementWindow = () => {
  const [payments, setPayments] = useState([
    { paymentId: 1, paymentName: 'Payment 1', paymentDetails: 'Details of Payment 1' },
    { paymentId: 2, paymentName: 'Payment 2', paymentDetails: 'Details of Payment 2' },
    { paymentId: 3, paymentName: 'Payment 3', paymentDetails: 'Details of Payment 3' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8095/payment/getPayments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div className="payment-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="payment-management-content-1">
        <h2 className="payment-management-heading-1">Payment Management</h2>
        {payments.length === 0 ? (
          <p className="payment-management-no-payments">No payments found.</p>
        ) : (
          <div className="payment-list">
            {payments.map((payment) => (
              <div key={payment.paymentId} className="payment-item">
                <p>
                  <strong>Payment Name:</strong> {payment.paymentName}
                </p>
                <p>
                  <strong>Payment Details:</strong> {payment.paymentDetails}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default PaymentManagementWindow;
