import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BikeModel.css';
import { Form } from 'react-router-dom';

const BikeModel = () => {
  const [bikeModel, setBikeModel] = useState('');
    const [bikeModels, setBikeModels] = useState([]);
    
    async function saveBikeModel(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8096/bikeModel/addBikeModel", {
            bikeModel,
          });
          alert("Bike Model Added Successfully");
          
        } catch (err) {
          alert(err);
        }
      }
  
  // Fetch data from Spring Boot REST API
  useEffect(() => {
    axios.get('http://localhost:8096/bikeModel/bikeModel')
      .then(response => {
        setBikeModels(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to ensure effect only runs once
  
  

 

  return (
    
    <div className="container">

<div className="bike-models-container" >
        {bikeModels.map((model, index) => (
          <div key={index} className="bike-model">
            {model.bikeModel}
          </div>
        ))}
      </div>

  
       <form className="add-bike-Model" onSubmit={saveBikeModel} >
            
      <h2>Add New Bike Model</h2>
      <input
        type="text"
        placeholder="Enter Model Name"
        value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
      />
      <button type="submit" className="add-model-button">Add Model</button>
      
      <button className="next-button">Next</button>
            
          </form>
   
      
      


      
    </div>

    


    
    
  );
};

export default BikeModel;
