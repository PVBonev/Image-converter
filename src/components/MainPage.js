import React, { useState } from 'react';
import appLogo from '../AP-logo.svg';
import '../styling/App.css';
import '../styling/Button.css';
import '../styling/Filter.css';
import Upload from './Upload.js';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('grayscale');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const filterToPath = {
    'grayscale': 'grayscale',
    'invert': 'inverted',
    'monochrome': 'monochrome',
    'gaussian': 'gaussian'
  };

  return (
    <div className="MainPage">
      <header className="App-header">
        <img src={appLogo} className="App-logo" alt="logo" />
        <p>
          Sasho and Pecata's Image Converter
        </p>
                
        <Upload onUpload={handleImageUpload} />


        <select className="styled-select" value={filter} onChange={handleFilterChange}>
          <option value="grayscale">Gray Scale</option>
          <option value="invert">Inverted Color</option>
          <option value="monochrome">Monochrome</option>
          <option value="gaussian">Gaussian Blur</option>
        </select>
        
        <button className="button-black" onClick={() => navigate(`/${filterToPath[filter]}Image`)}>Get Converted Image</button>
    
      </header>
    </div>
  );
}

export default MainPage;
