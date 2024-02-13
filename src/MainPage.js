import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload';
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Upload image</p>
        
        <Upload onUpload={handleImageUpload} />

        <br />

        <select value={filter} onChange={handleFilterChange}>
          <option value="grayscale">Gray Scale</option>
          <option value="invert">Inverted Color</option>
          <option value="monochrome">Monochrome</option>
          <option value="gaussian">Gaussian Blur</option>
        </select>

        <br />
        
        <button onClick={() => navigate(`/${filterToPath[filter]}Image`)}>Get Converted Image</button>
    
      </header>
    </div>
  );
}

export default MainPage;
