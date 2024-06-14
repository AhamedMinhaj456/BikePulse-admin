import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BikeModel.css';
import { Form } from 'react-router-dom';

const BikeCompany = () => {
  const [bikeCompany, setBikeCompany] = useState('');
    const [companies, setCompanies] = useState([]);
    
    async function saveCompany(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8096/company/addCompany", {
            bikeCompany,
          });
          alert("Company Added Successfully");
          
        } catch (err) {
          alert(err);
        }
      }
  
  // Fetch data from Spring Boot REST API
  useEffect(() => {
    axios.get('http://localhost:8096/company/company')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to ensure effect only runs once
  
  

 

  return (
    
    <div className="container">

<div className="bike-models-container" >
        {companies.map((model, index) => (
          <div key={index} className="bike-model">
            {model.bikeCompany}
          </div>
        ))}
      </div>

  
       <form className="add-bike-Model" onSubmit={saveCompany} >
            
      <h2>Add New Bike Company</h2>
      <input
        type="text"
        placeholder="Enter Company Name"
        value={bikeCompany}
              onChange={(e) => setBikeCompany(e.target.value)}
      />
      <button type="submit" className="add-model-button">Add Company</button>
      
      <button className="next-button">Next</button>
            
          </form>
   
      
      


      
    </div>

    


    
    
  );
};

export default BikeCompany;
