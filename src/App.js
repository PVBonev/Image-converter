import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ConvertedImage from './ConvertedImage'; // Import your ConvertedImage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/grayscaleImage" element={<ConvertedImage filter="grayscale" />} />
        <Route path="/invertedImage" element={<ConvertedImage filter="invert" />} />
        <Route path="/gaussianImage" element={<ConvertedImage filter="gaussian" />} />
        <Route path="/monochromeImage" element={<ConvertedImage filter="monochrome" />} />
      </Routes>
    </Router>
  );
}

export default App;
