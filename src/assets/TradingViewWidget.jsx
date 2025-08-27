import React, { useEffect, useRef } from 'react';

export default function TradingViewWidget({ symbol }) {
  const container = useRef(null); // Initialize the ref

  useEffect(() => {
    // Ensure the symbol is valid before loading the widget
    if (!symbol || !container.current) return;

    // Clear the container content before appending new script
    container.current.innerHTML = ''; // Reset the container

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      width: 200,
      height: 90,
      locale: "en",
      dateRange: "1D",
      colorTheme: "light",
      isTransparent: true,
      chartOnly: true,
      noTimeScale: true
    });

    container.current.appendChild(script);

    // Cleanup function to remove the script on unmount
    return () => {
      container.current.innerHTML = ''; // Clear the container
    };
  }, [symbol]); // Re-run effect when symbol changes

  return (
    <div className="h-[90px] w-[220px]" ref={container}> {/* Specify height and width here */}
      <div className="">
        <a href="" className='tradingview-widget-copyright' rel="noopener nofollow" target="_blank">
        </a>
      </div>
    </div>
  );
}
