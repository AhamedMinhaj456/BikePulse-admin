import React, { useState, useEffect } from 'react';
import './ServicePlansManagement.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const ServicePlansManagement = () => {
  const [plans, setPlans] = useState([
    { servicePlanId: 1, servicePlanName: 'Service Plan 1', servicePlanDescription: '', servicePlanPrice: '', servicePlanImage: '', selected: false },
    { servicePlanId: 2, servicePlanName: 'Service Plan 2', servicePlanDescription: '', servicePlanPrice: '', servicePlanImage: '', selected: false },
    { servicePlanId: 3, servicePlanName: 'Service Plan 3', servicePlanDescription: '', servicePlanPrice: '', servicePlanImage: '', selected: false },
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
      const response = await axios.get('http://localhost:8096/servicePlan/servicePlan');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (id, field, value) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.servicePlanId === id ? { ...plan, [field]: value } : plan))
    );
  };

  const handleImageChange = (id, file) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.servicePlanId === id ? { ...plan, servicePlanImage: file } : plan))
    );
  };

  // Backend connection: Function to save plans to the backend
  const handleSave = async () => {
    setEditMode(false);
    try {
      const updatedPlans = new FormData();
      plans.forEach((plan) => {
        updatedPlans.append('plans', JSON.stringify(plan));
        if (plan.servicePlanImage instanceof File) {
          updatedPlans.append('images', plan.servicePlanImage);
        }
      });

      await axios.put('http://localhost:8096/servicePlan/updateMultipleServicePlans', updatedPlans, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Plans Updated Successfully!');
    } catch (error) {
      console.error('Error saving plans:', error);
      alert('Failed to save plans. Please try again.');
    }
  };

  const [newPlan, setNewPlan] = useState({
    servicePlanName: '',
    servicePlanDescription: '',
    servicePlanPrice: '',
    servicePlanImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleNewImageChange = (e) => {
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      servicePlanImage: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('servicePlanName', newPlan.servicePlanName);
    formData.append('servicePlanDescription', newPlan.servicePlanDescription);
    formData.append('servicePlanPrice', newPlan.servicePlanPrice);
    formData.append('servicePlanImage', newPlan.servicePlanImage);

    try {
      await axios.post('http://localhost:8096/servicePlan/addServicePlan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Service Plan Successfully Added');
      setNewPlan({
        servicePlanName: '',
        servicePlanDescription: '',
        servicePlanPrice: '',
        servicePlanImage: null,
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
    <div className="service-plans-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>

      <div className="service-plans-management-content">
        <div className='add-plan-wrapper-service'>
          <h2 className='service-management-heading'>Service Plans Management</h2>
          <div className='add-plan-service'>
            <form className="plan-form-service" onSubmit={handleFormSubmit}>
              <h3 className='service-management-heading'>Add New Service Plan</h3>
              <label>Name</label>
              <input className='input-service'
                type="text"
                name="servicePlanName"
                value={newPlan.servicePlanName}
                onChange={handleChange}
              />
              <br />
              <label>Description:</label>
              <input className='input-service'
                type="text"
                name="servicePlanDescription"
                value={newPlan.servicePlanDescription}
                onChange={handleChange}
              />
              <br />
              <label>Price:</label>
              <input className='input-service'
                type="text"
                name="servicePlanPrice"
                value={newPlan.servicePlanPrice}
                onChange={handleChange}
              />
              <br />
              <label>Image:</label>
              <input className='input-service'
                type="file"
                name="servicePlanImage"
                onChange={handleNewImageChange}
              />
              <button className="save-button-service" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>

        {plans.map((plan) => (
          <div key={plan.servicePlanId} className="plan-item-service">
            <label>
              <input className='input-service'
                type="checkbox"
                checked={plan.selected}
                onChange={() =>
                  setPlans((prevPlans) =>
                    prevPlans.map((p) => (p.servicePlanId === plan.servicePlanId ? { ...p, selected: !p.selected } : p))
                  )
                }
              />
              {plan.servicePlanName}
            </label>
            {plan.selected && (
              <form className="plan-form">
                <label>{`Plan ${plan.servicePlanId} Name:`}</label>
                <input className='input-service'
                  type="text"
                  value={plan.servicePlanName}
                  onChange={(e) => handleInputChange(plan.servicePlanId, 'servicePlanName', e.target.value)}
                  readOnly={!editMode}
                />
                <br />
                <label>Description:</label>
                <input className='input-service'
                  type="text"
                  value={plan.servicePlanDescription}
                  onChange={(e) => handleInputChange(plan.servicePlanId, 'servicePlanDescription', e.target.value)}
                  readOnly={!editMode}
                />
                <br />
                <label>Price:</label>
                <input className='input-service'
                  type="text"
                  value={plan.servicePlanPrice}
                  onChange={(e) => handleInputChange(plan.servicePlanId, 'servicePlanPrice', e.target.value)}
                  readOnly={!editMode}
                />
                <br />
                <label>Image:</label>
                <input className='input-service'
                  type="file"
                  onChange={(e) => handleImageChange(plan.servicePlanId, e.target.files[0])}
                  disabled={!editMode}
                />
                {plan.servicePlanImage && (
                  <div>
                    <img
                      src={typeof plan.servicePlanImage === 'string' ? plan.servicePlanImage : URL.createObjectURL(plan.servicePlanImage)}
                      alt={plan.servicePlanName}
                      width="100"
                      height="100"
                    />
                  </div>
                )}
              </form>
            )}
            <div className="service-plans-management-buttons">
              <button
                className={`edit-button-service ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode(!editMode)}
              >
                Edit
              </button>
              <button className="save-button-service" onClick={handleSave} disabled={!editMode}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      <RightSidebar />
    </div>
  );
};

export default ServicePlansManagement;