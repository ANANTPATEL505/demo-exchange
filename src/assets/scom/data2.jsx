import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Data2 = ({ coinId }) => {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          params: {
            localization: false, // Disable localization if you don't need it
          },
        }
      );
      setCryptoData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error);
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [coinId]); // Re-fetch when coinId changes

  return (
    <div>
      <h2>{coinId.toUpperCase()} Details (Live)</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : cryptoData ? (
        <div className="text-white">
          <p><strong>Current Price:</strong> ${cryptoData.market_data.current_price.usd}</p>
          <p><strong>Market Cap:</strong> ${cryptoData.market_data.market_cap.usd.toLocaleString()}</p>
          <p><strong>24h Volume:</strong> ${cryptoData.market_data.total_volume.usd.toLocaleString()}</p>
          <p><strong>24h Change:</strong> {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
          <p><strong>Total Supply:</strong> {cryptoData.market_data.total_supply ? cryptoData.market_data.total_supply.toLocaleString() : 'N/A'}</p>
          <p><strong>Circulating Supply:</strong> {cryptoData.market_data.circulating_supply ? cryptoData.market_data.circulating_supply.toLocaleString() : 'N/A'}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Data2;
