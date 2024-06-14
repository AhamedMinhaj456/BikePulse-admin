import React, { useState, useEffect } from 'react';
import './SubscriptionPlansmanagementWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const SubscriptionPlansManagementWindow = () => {
  const [plans, setPlans] = useState([
    { subscriptionPlanId: 1, subscriptionPlanName: 'Plan 1', subscriptionPlanDescription: '', subscriptionPlanPrice: '', selected: false },
    { subscriptionPlanId: 2, subscriptionPlanName: 'Plan 2', subscriptionPlanDescription: '', subscriptionPlanPrice: '', selected: false },
    { subscriptionPlanId: 3, subscriptionPlanName: 'Plan 3', subscriptionPlanDescription: '', subscriptionPlanPrice: '', selected: false },
  ]);

  useEffect(() => {
    // Backend developer: Fetch user data from the backend and update state
    // Example:
    fetchData();
  }, []);

  // Backend connection: Function to fetch user data from the backend
  const fetchData = async () => {
    try {
      // Example using axios:
      const response = await axios.get('http://localhost:8096/subscriptionPlan/subscriptionPlan');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const [editMode, setEditMode] = useState(false);


  const handleInputChange = (id, field, value) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.subscriptionPlanId === id ? { ...plan, [field]: value } : plan))
    );
  };

  // Backend connection: Function to save plans to the backend
  const handleSave = () => {
    setEditMode(false);
    // Backend developer: Add code here to send plans to the backend and save them
    // Example:
    axios.put('http://localhost:8096/subscriptionPlan/updateMultipleSubscriptionPlans', plans)
      .then(response => {
        alert('Plan Updated Successfullly!');
      })
      .catch(error => {
        console.error('Error saving plans:', error);
        alert('Failed to save plans. Please try again.');
      });
  };


  const [newPlan, setNewPlan] = useState({
    subscriptionPlanName: '',
    subscriptionPlanDescription: '',
    subscriptionPlanPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8096/subscriptionPlan/addSubscriptionPlan', newPlan);
      alert('Subscription Plan Successfully Added');
      setNewPlan({
        subscriptionPlanName: '',
        subscriptionPlanDescription: '',
        subscriptionPlanPrice: '',
      });
    } catch (err) {
      alert(err);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="subscription-plans-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="subscription-plans-management-content">

        <div className='add-plan-wrapper'>
          <h2 className='subscription-management-heading'>Subscription Plans Management</h2>
          <div className='add-plan'>
            <form className="plan-form" onSubmit={handleFormSubmit}>
              <h3 className='subscription-management-heading'>Add New Subscription Plan</h3>
              <label>Name</label>
              <input
                type="text"
                name="subscriptionPlanName"
                value={newPlan.subscriptionPlanName}
                onChange={handleChange}
              />
              <br />
              <label>Description:</label>
              <input
                type="text"
                name="subscriptionPlanDescription"
                value={newPlan.subscriptionPlanDescription}
                onChange={handleChange}
              />
              <br />
              <label>Price:</label>
              <input
                type="text"
                name="subscriptionPlanPrice"
                value={newPlan.subscriptionPlanPrice}
                onChange={handleChange}
              />
              <button className="save-button-1" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>

        {plans.map((plan) => (
          <div key={plan.subscriptionPlanId} className="plan-item">
            <label>
              <input
                type="checkbox"
                checked={plan.selected}
                onChange={() =>
                  setPlans((prevPlans) =>
                    prevPlans.map((p) => (p.subscriptionPlanId === plan.subscriptionPlanId ? { ...p, selected: !p.selected } : p))
                  )
                }
              />
              {plan.subscriptionPlanName}
            </label>
            {plan.selected && (
              <form className="plan-form">
                <label>{`Plan ${plan.subscriptionPlanId} Name:`}</label>
                <input
                  type="text"
                  value={plan.subscriptionPlanName}
                  onChange={(e) => handleInputChange(plan.subscriptionPlanId, 'subscriptionPlanName', e.target.value)}
                  readOnly={!editMode}
                />
                <br />
                <label>Description:</label>
                <input
                  type="text"
                  value={plan.subscriptionPlanDescription}
                  onChange={(e) => handleInputChange(plan.subscriptionPlanId, 'subscriptionPlanDescription', e.target.value)}
                  readOnly={!editMode}
                />
                <br />
                <label>Price:</label>
                <input
                  type="text"
                  value={plan.subscriptionPlanPrice}
                  onChange={(e) => handleInputChange(plan.subscriptionPlanId, 'subscriptionPlanPrice', e.target.value)}
                  readOnly={!editMode}
                />
              </form>
            )}
            <div className="subscription-plans-management-buttons">
              <button
                className={`edit-button-1 ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode(!editMode)}
              >
                Edit
              </button>
              <button className="save-button-1" onClick={handleSave} disabled={!editMode}>
                Save
              </button>
            </div>
          </div>
        ))}

        {/* <div className="subscription-plans-management-buttons">
          <button
            className={`edit-button ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            Edit
          </button>
          <button className="save-button" onClick={handleSave} disabled={!editMode}>
            Save
          </button>
        </div> */}
      </div>

      <RightSidebar />
    </div>
  );
};

export default SubscriptionPlansManagementWindow;
