// src/components/Toolbar.jsx
import React from 'react';
import './Toolbar.css';

const timeFrameMapping = {
    '1m': '1',
    '5m': '5',
    '15m': '15',
    '1H': '60',
    '4H': '240',   
    '1D': 'D',
    '1W': 'W',
    '1M': 'M',
    '3M': '3M',
    '1Y': '12M'
  };

  const Toolbar = ({ onTimeFrameChange, activeTimeFrame }) => {
    return (
      <div className="toolbar">
        {Object.entries(timeFrameMapping).map(([displayText, tradingViewValue]) => (
          <button
            key={displayText}
            onClick={() => onTimeFrameChange(tradingViewValue)}
            className={activeTimeFrame === tradingViewValue ? 'active' : ''}
          >
            {displayText}
          </button>
        ))}
      </div>
    );
  };

export default Toolbar;
