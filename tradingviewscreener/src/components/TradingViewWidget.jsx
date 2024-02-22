// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import '../App.css';


function TradingViewWidget({ symbol, interval , width, height}) {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ''; // Clear the container for reinitialization
      
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        "width": width,
        "height": height,
        "symbol": symbol,
        "interval": interval,
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": true,
        "hide_top_toolbar": true,
        "hide_legend": false,
        "withdateranges": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "hide_volume": true,
        "details": false,
        // Additional widget configurations as needed
      });
      container.current.appendChild(script);
    }
  }, [symbol, interval, width, height]); // Depend on symbol and interval to re-render

  return (
    <div className="tradingview-widget-container" ref={container}>
      {/* TradingView Widget will be injected here */}
    </div>
  );
}

export default memo(TradingViewWidget);


