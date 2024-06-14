import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FaultSection.css';
import { Form } from 'react-router-dom';

const FaultSection = () => {
 
    //Braking System
    const [brakingSystem, setBrakingSystem] = useState('');
    const [brakingSystems, setBrakingSystems] = useState([]);

    //Electric System
    const [electricalSystem, setElectricalSystem] = useState('');
    const [electricalSystems, setElectricalSystems] = useState([]);

    //Engine System
    const [engine, setEngine] = useState('');
    const [engines, setEngines] = useState([]);

    //Exhaust System
    const [exhaustSystem, setExhaustSystem] = useState('');
    const [exhaustSystems, setExhaustSystems] = useState([]);

    //Fairing System
    const [fairingBodywork, setFairingBodywork] = useState('');
    const [fairingBodyworks, setFairingBodyworks] = useState([]);

    //Frame System
    const [frame, setFrame] = useState('');
    const [frames, setFrames] = useState([]);

    //Fuel System
    const [fuelSystem, setFuelSystem] = useState('');
    const [fuelSystems, setFuelSystems] = useState([]);

    //Handlebar System
    const [handleCowl, setHandleCowl] = useState('');
    const [handleCowls, setHandleCowls] = useState([]);

    //Suspension System
    const [suspensionSystem, setSuspensionSystem] = useState('');
    const [suspensionSystems, setSuspensionSystems] = useState([]);

    //Transmission System
    const [transmission, setTransmission] = useState('');
    const [transmissions, setTransmissions] = useState([]);

    //Wheel System
    const [wheelsTires, setWheelsTires] = useState('');
    const [wheelTires, setWheelTires] = useState([]);
    

    
    
    //Braking System
    async function saveBreakingSystem(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8096/brakingSystem/addBrakingSystem", {
            brakingSystem,
          });
          alert("Braking System Added Successfully");
          
        } catch (err) {
          alert(err);
        }
      }
  
  // Fetch data from Spring Boot REST API
  useEffect(() => {
    axios.get('http://localhost:8096/brakingSystem/brakeSystem')
      .then(response => {
        setBrakingSystems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  
  
  //Electric System
  async function saveElectricalSystem(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/electricalSystem/addElectricalSystem", {
        electricalSystem,
      });
      alert("Electrical System Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/electricalSystem/electricalSystem')
  .then(response => {
    setElectricalSystems(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);


//Engine System
async function saveEngine(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/engine/addEngine", {
        engine,
      });
      alert("Engine Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/engine/engine')
  .then(response => {
    setEngines(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);


//Exhaust System
async function saveExhaustSystem(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/exhaustSystem/addExhaustSystem", {
        exhaustSystem,
      });
      alert("Exhaust System Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/exhaustSystem/exhaustSystem')
  .then(response => {
    setExhaustSystems(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

// //Exhaust System
// async function saveExhaustSystem(event) {
//   event.preventDefault();
//   try {
//     await axios.post("http://localhost:8096/exhaustSystem/addExhaustSystem", {
//       exhaustSystem,
//     });
//     alert("Exhaust System Added Successfully");
    
//   } catch (err) {
//     alert(err);
//   }
// }

// // Fetch data from Spring Boot REST API
// useEffect(() => {
// axios.get('http://localhost:8096/exhaustSystem/exhaustSystem')
// .then(response => {
//   setExhaustSystems(response.data);
// })
// .catch(error => {
//   console.error('Error fetching data:', error);
// });
// }, []);

//Fairing System
async function saveFairings(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/fairingsBodywork/addFairingsBodywork", {
        fairingBodywork,
      });
      alert("Fairing And Bodywork Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/fairingsBodywork/fairingsBodywork')
  .then(response => {
    setFairingBodyworks(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

//Frame System
async function saveFrame(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/frame/addFrame", {
        frame,
      });
      alert("Frame Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/frame/frame')
  .then(response => {
    setFrames(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

//Fuel System
async function saveFuelSystem(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/fuelSystem/addFuelSystem", {
        fuelSystem,
      });
      alert("Fuel System Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/fuelSystem/fuelSystem')
  .then(response => {
    setFuelSystems(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);


//Handlebar System
async function saveHandleCowl(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/handleCowl/addHandleCowl", {
        handleCowl,
      });
      alert("Handle Cowl Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/handleCowl/handleCowl')
  .then(response => {
    setHandleCowls(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

//suspension System
async function saveSuspensionSystem(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/suspensionSystem/addSuspensionSystem", {
        suspensionSystem,
      });
      alert("Suspension System Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/suspensionSystem/suspensionSystem')
  .then(response => {
    setSuspensionSystems(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

//Transmission System
async function saveTransmission(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/transmission/addTransmission", {
        transmission,
      });
      alert("Transmission Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/transmission/transmission')
  .then(response => {
    setTransmissions(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);

//Wheel System
async function saveWheelTyres(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8096/wheelsTires/addWheelsTires", {
        wheelsTires,
      });
      alert("Wheel And Tyres Added Successfully");
      
    } catch (err) {
      alert(err);
    }
  }

// Fetch data from Spring Boot REST API
useEffect(() => {
axios.get('http://localhost:8096/wheelsTires/wheelsTires')
  .then(response => {
    setWheelTires(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, []);


  
  

 

  return (   
    <div> 

    {/*  brakeSystem */}

    <div className="container">
  <div className="bike-models-container">
    {brakingSystems.map((model, index) => (
      <div key={index} className="bike-model">
        {model.brakingSystem}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveBreakingSystem}>
    <h2>Add New Braking System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={brakingSystem}
      onChange={(e) => setBrakingSystem(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

    

{/* Electrical System */}
<div className="container">

  <div className="bike-models-container">
    {electricalSystems.map((model, index) => (
      <div key={index} className="bike-model">
        {model.electricalSystem}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveElectricalSystem}>
    <h2>Add New Electrical System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={electricalSystem}
      onChange={(e) => setElectricalSystem(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
</div>   
  
  {/* Engine System */}
  <div className="container">
  <div className="bike-models-container">
    {engines.map((model, index) => (
      <div key={index} className="bike-model">
        {model.engine}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveEngine}>
    <h2>Add New Engine System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={engine}
      onChange={(e) => setEngine(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>
    

{/* Exhaust System */}
    <div className="container">
    <div className="bike-models-container">
    {exhaustSystems.map((model, index) => (
      <div key={index} className="bike-model">
        {model.exhaustSystem}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveExhaustSystem}>
    <h2>Add New Exhaust System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={exhaustSystem}
      onChange={(e) => setExhaustSystem(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

    {/* Fairings And Body Work System */}
    <div className="container">

  <div className="bike-models-container">
    {fairingBodyworks.map((model, index) => (
      <div key={index} className="bike-model">
        {model.fairingBodywork}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveFairings}>
    <h2>Add New Fairing And Bodywork System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={fairingBodywork}
      onChange={(e) => setFairingBodywork(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
</div>


    {/* Frame System */}
    <div className="container">
  <div className="bike-models-container">
    {frames.map((model, index) => (
      <div key={index} className="bike-model">
        {model.frame}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveFrame}>
    <h2>Add New Frame System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={frame}
      onChange={(e) => setFrame(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

    {/* Fuel System */}
    <div className="container">
  <div className="bike-models-container">
    {fuelSystems.map((model, index) => (
      <div key={index} className="bike-model">
        {model.fuelSystem}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveFuelSystem}>
    <h2>Add New Fuel System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={fuelSystem}
      onChange={(e) => setFuelSystem(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

    {/* Handle And Cowl System */}
    <div className="container">
  <div className="bike-models-container">
    {handleCowls.map((model, index) => (
      <div key={index} className="bike-model">
        {model.handleCowl}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveHandleCowl}>
    <h2>Add New Handle And Cowl System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={handleCowl}
      onChange={(e) => setHandleCowl(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

    {/* Suspension System */}
    <div className="container">
  <div className="bike-models-container">
    {suspensionSystems.map((model, index) => (
      <div key={index} className="bike-model">
        {model.suspensionSystem}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveSuspensionSystem}>
    <h2>Add New Suspension System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={suspensionSystem}
      onChange={(e) => setSuspensionSystem(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

   

    {/* Transmission System */}
    <div className="container">
  <div className="bike-models-container">
    {transmissions.map((model, index) => (
      <div key={index} className="bike-model">
        {model.transmission}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveTransmission}>
    <h2>Add New Transmission System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={transmission}
      onChange={(e) => setTransmission(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>

    
     {/* Wheel and Tyre System */}
     <div className="container">
     <div className="bike-models-container">
    {wheelTires.map((model, index) => (
      <div key={index} className="bike-model">
        {model.wheelsTires}
      </div>
    ))}
  </div>

  <form className="add-bike-Model" onSubmit={saveWheelTyres}>
    <h2>Add New Wheel And Tyre System</h2>
    <input
      type="text"
      required
      placeholder="Enter Model Name"
      value={wheelsTires}
      onChange={(e) => setWheelsTires(e.target.value)}
    />
    <button type="submit" className="add-model-button">Add Model</button>
    <button className="next-button">Next</button>
  </form>
    </div>
    </div>);

};

export default FaultSection;
