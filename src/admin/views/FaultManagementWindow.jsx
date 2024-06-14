import React, { useState, useEffect } from 'react';
import './FaultManagementWindow.css';
import LeftSidebar from '../common/LeftSidebar';
import RightSidebar from '../common/RightSidebar';
import { FaBars } from 'react-icons/fa';

const FaultManagementWindow = () => {
  const [faults, setFaults] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Fault ${index + 1}`,
      options: ['', '', ''],
      associatedModel: '',
      associatedPart: '',
      associatedShop: '',
      tickSelected: false,
    }))
  );

  const [bikeModels, setBikeModels] = useState([]);
  const [bikeParts, setBikeParts] = useState([]);
  const [shops, setShops] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedFaultId, setSelectedFaultId] = useState(null);
  const [editedBy, setEditedBy] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Simulated default data for bike models, bike parts, and shops
  const defaultBikeModels = [
    { id: 1, name: 'BMW', enteredBy: 'Admin', enteredDate: '4/5/2024' },
    { id: 2, name: 'TVS', enteredBy: 'Admin', enteredDate: '4/5/2024' },
    { id: 3, name: 'Yamaha', enteredBy: 'Admin', enteredDate: '4/5/2024' }
  ];

  const defaultBikeParts = [
    { id: 1, name: 'Wheel', enteredBy: 'Admin', enteredDate: '4/5/2024' },
    { id: 2, name: 'Frame', enteredBy: 'Admin', enteredDate: '4/5/2024' },
    { id: 3, name: 'Handlebar', enteredBy: 'Admin', enteredDate: '4/5/2024' }
  ];

  const defaultShops = [
    { id: 1, name: 'Bike Shop 1', enteredBy: 'Admin', enteredDate: '4/5/2024' },
    { id: 2, name: 'Bike Shop 2', enteredBy: 'Admin', enteredDate: '4/5/2024' },
    { id: 3, name: 'Bike Shop 3', enteredBy: 'Admin', enteredDate: '4/5/2024' }
  ];

  // Initialize bike models, bike parts, and shops with default data
  useEffect(() => {
    setBikeModels(defaultBikeModels);
    setBikeParts(defaultBikeParts);
    setShops(defaultShops);
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  // In the handleAddBikeModel function, capture enteredBy and enteredDate
  const handleAddBikeModel = (e) => {
    e.preventDefault();
    const newModelName = e.target.elements.newModelName.value;
    const enteredBy = e.target.elements.enteredBy.value || 'Logged In User'; // Default to 'Logged In User' if no name provided
    const enteredDate = new Date().toLocaleDateString(); // Get current date

    if (newModelName.trim() !== '') {
      setBikeModels([...bikeModels, {
        id: bikeModels.length + 1,
        name: newModelName,
        enteredBy: enteredBy,
        enteredDate: enteredDate
      }]);
      e.target.elements.newModelName.value = '';
      e.target.elements.enteredBy.value = '';
    }
  };

  // In the handleAddBikePart function, capture enteredBy and enteredDate
  const handleAddBikePart = (e) => {
    e.preventDefault();
    const newPartName = e.target.elements.newPartName.value;
    const enteredBy = e.target.elements.enteredBy.value || 'Logged In User'; // Default to 'Logged In User' if no name provided
    const enteredDate = new Date().toLocaleDateString(); // Get current date

    if (newPartName.trim() !== '') {
      setBikeParts([...bikeParts, {
        id: bikeParts.length + 1,
        name: newPartName,
        enteredBy: enteredBy,
        enteredDate: enteredDate
      }]);
      e.target.elements.newPartName.value = '';
      e.target.elements.enteredBy.value = '';
    }
  };

  // In the handleAddBikeShop function, capture enteredBy and enteredDate
  const handleAddShop = (e) => {
    e.preventDefault();
    const newShopName = e.target.elements.newShopName.value;
    const enteredBy = e.target.elements.enteredBy.value || 'Logged In User'; // Default to 'Logged In User' if no name provided
    const enteredDate = new Date().toLocaleDateString(); // Get current date
  
    if (newShopName.trim() !== '') {
      setShops([...shops, {
        id: shops.length + 1,
        name: newShopName,
        enteredBy: enteredBy,
        enteredDate: enteredDate
      }]);
      e.target.elements.newShopName.value = '';
      e.target.elements.enteredBy.value = '';
    }
  };
  
  // check this part for action editing
  const [editedByInput, setEditedByInput] = useState('');

  const handleEdit = (id, editedBy) => {
    setSelectedFaultId(id);
    setEditedByInput(editedBy); // Set the editedByInput state with the current value
  };

  const updateCurrentDate = () => {
    setCurrentDate(new Date().toLocaleDateString());
  };

  const handleSaveEdit = () => {
    setSelectedFaultId(null);
    setFaults(prevFaults =>
      prevFaults.map(fault =>
        fault.id === selectedFaultId ? { ...fault, editedBy: editedBy, editedDate: currentDate } : fault
      )
    );
    // You need to implement code here to save the edited data to the database.
    // This might involve making an API call to update the database.
  };

  // upto here want to check
  const handleNextStep = () => {
    if (step === 1) {
      if (bikeModels.length === 0) {
        alert('Please enter at least one bike model.');
      } else {
        alert('You have successfully entered bike models.');
        setStep(2);
      }
    } else if (step === 2) {
      if (bikeParts.length === 0) {
        alert('Please enter at least one bike part.');
      } else {
        alert('You have successfully entered bike parts.');
        setStep(3);
      }
    } else if (step === 3) {
      if (shops.length === 0) {
        alert('Please enter at least one shop.');
      } else {
        alert('You have successfully entered shops.');
        setStep(4);
      }
    }
  };

  const handleInputChange = (id, field, value, fieldType) => {
    switch (fieldType) {
      case 'model':
        setBikeModels(prevModels =>
          prevModels.map(model =>
            model.id === id ? { ...model, name: value } : model
          )
        );
        break;
      case 'part':
        setBikeParts(prevParts =>
          prevParts.map(part =>
            part.id === id ? { ...part, name: value } : part
          )
        );
        break;
      case 'shop':
        setShops(prevShops =>
          prevShops.map(shop =>
            shop.id === id ? { ...shop, name: value } : shop
          )
        );
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Faults saved!');
  };

  const handleOptionChange = (faultId, optionIndex, value) => {
    setFaults(prevFaults =>
      prevFaults.map(fault =>
        fault.id === faultId ? {
          ...fault,
          options: fault.options.map((option, index) => index === optionIndex ? value : option)
        } : fault
      )
    );
  };

  const handleShowDetailsToggle = (id) => {
    setFaults(prevFaults =>
      prevFaults.map(fault =>
        fault.id === id ? { ...fault, tickSelected: !fault.tickSelected } : fault
      )
    );
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div className="fault-management">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>

      <div className={`left-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <LeftSidebar />
      </div>
      
      <div className="fault-management-content">
        {step === 1 && (
          <div className='part'>
            <h2>Enter Bike Models</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Entered By</th>
                  <th>Entered Date</th>
                  <th>Edited By</th>
                  <th>Edited Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bikeModels.map((model) => (
                  <tr key={model.id}>
                    <td>{model.id}</td>
                    <td>{selectedFaultId === model.id ? <input type="text" value={model.name} onChange={(e) => handleInputChange(model.id, 'name', e.target.value, 'model')} /> : model.name}</td>
                    <td>{model.enteredBy}</td>
                    <td>{model.enteredDate}</td>
                    <td>{selectedFaultId === model.id ? (<input type="text" value={editedByInput} onChange={(e) => setEditedBy(e.target.value)} />) : (model.editedBy)}</td>
                    <td>{model.editedDate}</td>
                    <td>
                      {selectedFaultId === model.id ? (
                        <button className='action-button' onClick={handleSaveEdit}>Save</button>
                      ) : (
                        <button className='action-button' onClick={() => handleEdit(model.id)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div >
              <h3>Add New Bike Model</h3>
              <form onSubmit={handleAddBikeModel}>
                <input className='add-input' type="text" name="newModelName" placeholder="Enter Model Name" />
                <input className='add-input' type="text" name="enteredBy" placeholder="Entered By" />
                <button className='add-button' type="submit">Add Model</button>
              </form>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='part'>
            <h2>Enter Bike Parts</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Entered By</th>
                  <th>Entered Date</th>
                  <th>Edited By</th>
                  <th>Edited Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bikeParts.map((part) => (
                  <tr key={part.id}>
                    <td>{part.id}</td>
                    <td>{selectedFaultId === part.id ? <input type="text" value={part.name} onChange={(e) => handleInputChange(part.id, 'name', e.target.value, 'part')} /> : part.name}</td>
                    <td>{part.enteredBy}</td>
                    <td>{part.enteredDate}</td>
                    <td>{selectedFaultId === part.id ? <input type="text" value={editedBy} onChange={(e) => setEditedBy(e.target.value)} /> : part.editedBy}</td>
                    <td>{part.editedDate}</td>
                    <td>
                      {selectedFaultId === part.id ? (
                        <button className='action-button' onClick={handleSaveEdit}>Save</button>
                      ) : (
                        <button className='action-button' onClick={() => handleEdit(part.id)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h3>Add New Bike Part</h3>
              <form onSubmit={handleAddBikePart}>
                <input className='add-input' type="text" name="newPartName" placeholder="Enter name" />
                <input className='add-input' type="text" name="enteredBy" placeholder="Entered By" />
                <button className='add-button' type="submit">Add Part</button>
              </form>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='part'>
            <h2>Enter Shops</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Entered By</th>
                  <th>Entered Date</th>
                  <th>Edited By</th>
                  <th>Edited Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr key={shop.id}>
                    <td>{shop.id}</td>
                    <td>{selectedFaultId === shop.id ? <input type="text" value={shop.name} onChange={(e) => handleInputChange(shop.id, 'name', e.target.value, 'shop')} /> : shop.name}</td>
                    <td>{shop.enteredBy}</td>
                    <td>{shop.enteredDate}</td>
                    <td>{selectedFaultId === shop.id ? <input type="text" value={editedBy} onChange={(e) => setEditedBy(e.target.value)} /> : shop.editedBy}</td>
                    <td>{shop.editedDate}</td>
                    <td>
                      {selectedFaultId === shop.id ? (
                        <button className='action-button' onClick={handleSaveEdit}>Save</button>
                      ) : (
                        <button className='action-button' onClick={() => handleEdit(shop.id)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h3>Add New Shop</h3>
              <form onSubmit={handleAddShop}>
                <input className='add-input' type="text" name="newShopName" placeholder="Enter name" />
                <input className='add-input' type="text" name="enteredBy" placeholder="Entered By" />
                <button className='add-button' type="submit">Add Shop</button>
              </form>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className='editing-main'>
            <h2>Fault Category Management</h2>
            {faults.map((fault) => (
              <div key={fault.id} className="fault-item">
                <form className="fault-form">
                  <label>
                    <input
                      type="checkbox"
                      checked={fault.tickSelected}
                      onChange={() => handleShowDetailsToggle(fault.id)}
                    />
                    Show Details
                  </label>
                  <label>{`Fault ${fault.id}:`}</label>
                  <input
                    type="text"
                    value={fault.name}
                    onChange={(e) => handleInputChange(fault.id, 'name', e.target.value)}
                    readOnly={!editMode}
                  />
                  {fault.tickSelected && (
                    <>
                      <br />
                      {fault.options.map((option, index) => (
                        <div key={index}>
                          <label>{`Option ${index + 1}:`}</label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(fault.id, index, e.target.value)}
                            readOnly={!editMode}
                          />
                          <br />
                        </div>
                      ))}
                      <label>Associated Bike Model:</label>
                      <select
                        value={fault.associatedModel}
                        onChange={(e) => handleInputChange(fault.id, 'associatedModel', e.target.value)}
                        disabled={!editMode}
                      >
                        <option value="">Select a model...</option>
                        {bikeModels.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      <br />
                      <label>Associated Bike Part:</label>
                      <select
                        value={fault.associatedPart}
                        onChange={(e) => handleInputChange(fault.id, 'associatedPart', e.target.value)}
                        disabled={!editMode}
                      >
                        <option value="">Select a part...</option>
                        {bikeParts.map((part) => (
                          <option key={part.id} value={part.id}>
                            {part.name}
                          </option>
                        ))}
                      </select>
                      <br />
                      <label>Associated Shop:</label>
                      <select
                        value={fault.associatedShop}
                        onChange={(e) => handleInputChange(fault.id, 'associatedShop', e.target.value)}
                        disabled={!editMode}
                      >
                        <option value="">Select a shop...</option>
                        {shops.map((shop) => (
                          <option key={shop.id} value={shop.id}>
                            {shop.name}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </form>
              </div>
            ))}
            <div className="fault-management-buttons">
              <button
                className={`edit-button ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
              <button className="save-button" onClick={handleSave} disabled={!editMode}>
                Save
              </button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="fault-management-buttons">
            <button className="next-button" onClick={handleNextStep}>Next</button>
          </div>
        )}
      </div>

      <RightSidebar />
    </div>
  );
};

export default FaultManagementWindow;
