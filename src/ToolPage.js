//import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import MapComponent from './MapComponent'; // Import the MapComponent
//
//const ToolPage = () => {
//  const [threshold, setThreshold] = useState(50);
//  const [results, setResults] = useState('');
//
//  const handleThresholdChange = (event) => {
//    setThreshold(event.target.value);
//  };
//
//  const handleEnterClick = () => {
//    setResults(`Results based on a habitability threshold of ${threshold}`);
//  };
//
//  return (
//    <div className="tool-page container-fluid">
//      <div className="row">
//        {/* Map Section */}
//        <div className="col-md-6">
//          <div style={{ height: '100vh' }}>
//            <MapComponent />
//          </div>
//        </div>
//
//        {/* Tool Explanation and Controls */}
//        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
//          <h3>How to Use the Tool</h3>
//          <p>Use the slider to set the habitability threshold. The results will be displayed below.</p>
//
//          <div className="mb-4">
//            <input
//              type="range"
//              min="0"
//              max="100"
//              value={threshold}
//              onChange={handleThresholdChange}
//              className="form-range"
//            />
//            <div>Threshold: {threshold}</div>
//          </div>
//
//          <button className="btn btn-primary" onClick={handleEnterClick}>Enter</button>
//
//          <div className="mt-4">
//            <h5>Results:</h5>
//            <p>{results}</p>
//          </div>
//        </div>
//      </div>
//    </div>
//  );
//};
//
//export default ToolPage;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapComponent from './MapComponent'; // Import the MapComponent
import { Popover, PopoverBody, PopoverHeader, Button } from 'reactstrap'; // Import Bootstrap components for Popover

const ToolPage = () => {
  const [threshold, setThreshold] = useState(50); // Threshold for probability
  const [latitude, setLatitude] = useState(null); // Latitude from the map click
  const [longitude, setLongitude] = useState(null); // Longitude from the map click
  const [results, setResults] = useState([]); // Store the results (species, probabilities, AUC)
  const [popoverOpen, setPopoverOpen] = useState(false); // State for Popover toggle

  // Handle threshold slider change
  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  // Handle "Enter" button click
  const handleEnterClick = () => {
    if (latitude && longitude) {
      // Call API with latitude, longitude, and threshold
      fetchResults(latitude, longitude, threshold);
    } else {
      alert('Please provide valid coordinates (either by clicking on the map or entering them manually).');
    }
  };

  // Function to fetch results from Flask backend
  const fetchResults = (lat, lng, minProbability) => {
    fetch('http://127.0.0.1:5000/api/get-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
        minProbability: minProbability,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        return response.json();  // Ensure the response is parsed as JSON
      })
      .then(data => {
        console.log('Received data:', data);
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  };

  // Function to update latitude and longitude from map click
  const handleMapClick = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  // Function to toggle the Popover
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <div className="tool-page container-fluid">
      <div className="row">
        {/* Map Section */}
        <div className="col-md-6">
          <div style={{ height: '100vh' }}>
            {/* Pass handleMapClick to MapComponent */}
            <MapComponent onMapClick={handleMapClick} />
          </div>
        </div>

        {/* Tool Explanation and Controls */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h3>Tool Instructions</h3>
          <div className="mb-3">
            {/* Popover trigger button */}
{/*            <Button id="Popover1" onClick={togglePopover} color="info">How to Use the Tool</Button>
            <Popover placement="right" isOpen={popoverOpen} target="Popover1" toggle={togglePopover}>
              <PopoverHeader>How to Use the Tool</PopoverHeader>
              <PopoverBody>
                <ul>
                  <li><strong>Select a Location:</strong> Click on the map to select a point.</li>
                  <li><strong>Enter Coordinates Manually:</strong> Enter latitude and longitude directly into the fields.</li>
                  <li><strong>Use Current Location:</strong> Click "Use Current Location" to get your coordinates automatically.</li>
                  <li><strong>Adjust Threshold:</strong> Use the slider to set the habitability threshold.</li>
                  <li><strong>Click Enter:</strong> View the results after clicking Enter with the selected criteria.</li>
                </ul>
              </PopoverBody>
            </Popover> */}
<Button id="Popover1" onClick={togglePopover} color="info">How to Use the Tool</Button>
    <Popover placement="right" isOpen={popoverOpen} target="Popover1" toggle={togglePopover}>
      <PopoverHeader>How to Use the Tool</PopoverHeader>
      <PopoverBody>
        <ul>
          <li><strong>Enter Coordinates:</strong> Input the latitude and longitude of your site, or select the "Current Location" option to automatically detect your position, or click on the map to select the location.</li>
          <li><strong>Set Threshold:</strong> Use the slider to adjust the minimum probability of occupancy for evergreen plant species based on your site's bioclimatic conditions. Keep in mind that species with a low probability of occupancy may not be suitable for planting at your site.</li>
          <li><strong>Discover Species:</strong> Click "Enter" to generate a list of recommended native species that are well-suited to your location.</li>
          <li><strong>No Results?:</strong> If no results are found, try selecting a nearby location or lowering the threshold to expand your options.</li>
        </ul>
      </PopoverBody>
    </Popover>
          </div>

          {/* Latitude and Longitude Inputs */}
          <div className="mt-4">
            <h5>Coordinates:</h5>
            <div className="d-flex">
              <div className="me-2">
                <label htmlFor="latitude" className="form-label">Latitude:</label>
                <input
                  type="number"
                  id="latitude"
                  className="form-control"
                  value={latitude || ''}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Enter latitude"
                  step="any"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="form-label">Longitude:</label>
                <input
                  type="number"
                  id="longitude"
                  className="form-control"
                  value={longitude || ''}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Enter longitude"
                  step="any"
                />
              </div>
            </div>
          </div>

          {/* Button to use current location */}
          <button className="btn btn-secondary mt-2" onClick={() => navigator.geolocation.getCurrentPosition((pos) => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);
          })}>Use Current Location</button>

          <p>Use the slider to set the habitability threshold. The results will be displayed below.</p>

          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={handleThresholdChange}
              className="form-range"
            />
            <div>Threshold: {threshold}</div>
          </div>

          <button className="btn btn-primary" onClick={handleEnterClick}>Enter</button>

          {/* Display the results */}
          {results.length > 0 ? (
            <div className="mt-4">
              <h5>Results (Species above {threshold}% suitability):</h5>
              <ul className="list-group">
                {results.map((result, index) => (
                  <li key={index} className="list-group-item">
                    <div>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(result.species)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        <strong>{result.species}</strong>
                      </a>
                      - {result.probability}% suitability - AUC: {result.auc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p>No results found. Please try another location or lower the threshold.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolPage;

