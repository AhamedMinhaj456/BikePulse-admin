import React, { useState, useEffect } from 'react';
import './ServicePlansManagement.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const ServicePlansManagement = () => {
  const [plans, setPlans] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [newPlan, setNewPlan] = useState({
    serviceType: '',
    serviceTypeDescription: '',
    serviceTypeImage: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8095/serviceType/serviceType');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching service plans:', error);
    }
  };

  const handleInputChange = (id, field, value) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.serviceTypeId === id ? { ...plan, [field]: value } : plan))
    );
  };

  const handleImageChange = (id, file) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.serviceTypeId === id ? { ...plan, serviceTypeImage: file } : plan))
    );
  };

  const handleSave = async () => {
    try {
      const updatedPlans = new FormData();
      plans.forEach((plan) => {
        updatedPlans.append('serviceTypes', JSON.stringify(plan));
        if (plan.serviceTypeImage instanceof File) {
          updatedPlans.append('images', plan.serviceTypeImage);
        }
      });

      await axios.put('http://localhost:8095/serviceType/updateServiceType', updatedPlans, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Service Plans Updated Successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error saving service plans:', error);
      alert('Failed to save service plans. Please try again.');
    }
  };

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
      serviceTypeImage: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newPlan.serviceTypeImage) {
      alert('Please select an image for the service plan.');
      return;
    }

    const formData = new FormData();
    formData.append('serviceType', newPlan.serviceType);
    formData.append('serviceTypeDescription', newPlan.serviceTypeDescription);
    formData.append('serviceTypeImage', newPlan.serviceTypeImage);

    try {
      await axios.post('http://localhost:8095/serviceType/addServiceType', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Service Plan Successfully Added');
      setNewPlan({
        serviceType: '',
        serviceTypeDescription: '',
        serviceTypeImage: '',
      });
      fetchData();
    } catch (err) {
      console.error('Error adding service plan:', err);
      alert('Failed to add service plan. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service plan?')) {
      try {
        await axios.delete(`http://localhost:8095/serviceType/deleteServiceType/${id}`);
        alert('Service Plan Deleted Successfully');
        fetchData();
      } catch (err) {
        console.error('Error deleting service plan:', err);
        alert('Failed to delete service plan. Please try again.');
      }
    }
  };

  const toggleEditMode = (id) => {
    setEditMode(true);
    setSelectedPlanId(id);
  };

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
                name="serviceType"
                value={newPlan.serviceType}
                onChange={handleChange}
              />
              <br />
              <label>Description:</label>
              <input className='input-service'
                type="text"
                name="serviceTypeDescription"
                value={newPlan.serviceTypeDescription}
                onChange={handleChange}
              />
              <br />
              <label>Image:</label>
              <input className='input-service'
                type="file"
                name="serviceTypeImage"
                onChange={handleNewImageChange}
              />
              <button className="save-button-service" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>

        {plans.map((plan) => (
          <div key={plan.serviceTypeId} className="plan-item-service">
            <label>{`Service Type: ${plan.serviceType}`}</label>
            <form className="plan-form">
              <label>Description:</label>
              <input className='input-service'
                type="text"
                value={plan.serviceTypeDescription}
                onChange={(e) => handleInputChange(plan.serviceTypeId, 'serviceTypeDescription', e.target.value)}
                readOnly={editMode && selectedPlanId !== plan.serviceTypeId}
              />
              <br />
              <label>Image:</label>
              <input className='input-service'
                type="file"
                onChange={(e) => handleImageChange(plan.serviceTypeId, e.target.files[0])}
                disabled={editMode && selectedPlanId !== plan.serviceTypeId}
              />
              {plan.serviceTypeImage && (
                <div>
                  <img
                    src={typeof plan.serviceTypeImage === 'string' ? plan.serviceTypeImage : URL.createObjectURL(plan.serviceTypeImage)}
                    alt={plan.serviceType}
                    width="100"
                    height="100"
                  />
                </div>
              )}
            </form>
            <div className="service-plans-management-buttons">
              {!editMode && (
                <button
                  className="edit-button-service"
                  onClick={() => toggleEditMode(plan.serviceTypeId)}
                >
                  Edit
                </button>
              )}
              {editMode && selectedPlanId === plan.serviceTypeId && (
                <>
                  <button className="save-button-service" onClick={handleSave}>
                    Save
                  </button>
                  <button className="delete-button-service" onClick={() => handleDelete(plan.serviceTypeId)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <RightSidebar />
    </div>
  );
};

export default ServicePlansManagement;
