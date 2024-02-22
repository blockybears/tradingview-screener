import React, { useState, useEffect } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import TradingViewWidget from './components/TradingViewWidget';

function App() {
  const [timeFrame, setTimeFrame] = useState('D');
  const [symbols, setSymbols] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [widgetWidth, setWidgetWidth] = useState('980'); // Default width
  const [widgetHeight, setWidgetHeight] = useState('610'); // Default height

  // Load symbols from local storage on initial load
  useEffect(() => {
    const savedSymbols = localStorage.getItem('symbols');
    if (savedSymbols) {
      setSymbols(JSON.parse(savedSymbols));
    }
  }, []);

  // Save symbols to local storage when they change
  useEffect(() => {
    localStorage.setItem('symbols', JSON.stringify(symbols));
  }, [symbols]);

  const handleSymbolSubmit = (newSymbols) => {
    setSymbols(newSymbols.split('\n').filter(Boolean)); // Splits by new line and removes empty strings
    setIsExpanded(false); // Closes the slider after submitting symbols
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const toggleSlider = () => {
    setIsExpanded(!isExpanded);
  };

// Function to handle dimension changes (add this inside your component)
const handleDimensionChange = (dimension, value) => {
  if (dimension === 'width') {
    setWidgetWidth(value);
  } else if (dimension === 'height') {
    setWidgetHeight(value);
  }
};

  return (
    <div className="App">
        {/* App details */}
    <div className={`slider ${isExpanded ? 'expanded' : ''}`}>
      <div className="toggle-button" onClick={toggleSlider}>
        {isExpanded ? '↑ Close Settings' : '↓ Open Settings'}
      </div>
      <div className="slider-content">
        {/* Expandable content */}

        <label htmlFor="widget-width">Width:</label>
        <input
          type="number"
          value={widgetWidth}
          onChange={(e) => handleDimensionChange('width', e.target.value)}
          placeholder="Widget Width"
        />
      
        <label htmlFor="widget-height">Height:  </label>
        <input
          type="number"
          value={widgetHeight}
          onChange={(e) => handleDimensionChange('height', e.target.value)}
          placeholder="Widget Height"
        />        
        <br></br>
        <label htmlFor="symbols-textarea">Symbols:</label>
        <textarea
          className="trading-view-textarea"
          defaultValue={symbols.join('\n')}
          onBlur={(e) => handleSymbolSubmit(e.target.value)} />

      </div>
    </div>
      <div className="toolbar-container">
        <Toolbar onTimeFrameChange={handleTimeFrameChange} />
      </div>
      <div className="widget-container">
      {symbols.map(symbol => (
        <TradingViewWidget
          key={symbol}
          symbol={symbol}
          interval={timeFrame}
          width={widgetWidth} // Dynamically set width
          height={widgetHeight} // Dynamically set height
        />
      ))}
    </div>
    </div>
  );
}

export default App;
