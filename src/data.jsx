import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context to store the price data and detailed coin data
export const PriceContext = createContext();

const Data = ({ children }) => {
  const [tokenData, setTokenData] = useState([]); // Store token data
  const [priceData, setPriceData] = useState([]); // Store price data
  const [cryptoData, setCryptoData] = useState([]); // Store CoinGecko data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch token data from the database when component mounts
  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tokens');
        setTokenData(response.data); // Save fetched token data
        setPriceData(Array(response.data.length).fill(null)); // Initialize price data
      } catch (error) {
        setError('Failed to fetch token data');
        console.error(error);
      }
    };

    fetchTokenData();
  }, []);

  useEffect(() => {
    if (!tokenData.length) return; // Wait until tokenData is loaded

    const fetchPythData = async () => {
      const urls = tokenData.map(token => `https://hermes.pyth.network/v2/updates/price/stream?ids[]=${token.id}`);

      setLoading(true); // Start loading

      try {
        const fetchStreams = urls.map(async (url, index) => {
          const response = await fetch(url);
          if (!response.body) throw new Error('Stream not supported.');

          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            let jsonStart = buffer.indexOf('{');
            let jsonEnd = buffer.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
              const jsonString = buffer.slice(jsonStart, jsonEnd + 1).trim();

              try {
                const parsedData = JSON.parse(jsonString);
                if (parsedData.parsed && parsedData.parsed.length > 0) {
                  const newPriceData = parsedData.parsed[0].price?.price;
                  setPriceData(prevData => {
                    const updatedData = [...prevData];
                    updatedData[index] = newPriceData; // Update specific index with new data
                    return updatedData;
                  });
                  setLoading(false); // Set loading to false when data is received
                }
              } catch (err) {
                console.error('Error parsing Pyth data:', err);
              }

              buffer = buffer.slice(jsonEnd + 1); // Clean the buffer
            }
          }
        });

        await Promise.all(fetchStreams);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchCoinGeckoData = async () => {
      const tokenIds = tokenData.map(token => token.name.toLowerCase()).join(',');

      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
          params: {
            vs_currency: 'usd',
            ids: tokenIds,
            localization: false,
          },
        });
        setCryptoData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching CoinGecko data:', error);
        setError('Failed to fetch CoinGecko data');
      }
    };

    // Fetch both data sets
    fetchPythData();
    fetchCoinGeckoData();

    // Cleanup function to handle component unmounting
    return () => {
      setPriceData([]); // Reset price data or any other necessary cleanup
      setLoading(true);
      setError(null);
    };
  }, [tokenData]); // Runs only when tokenData changes

  return (
    <PriceContext.Provider value={{ priceData, cryptoData, loading, error, tokenData }}>
      {children}
    </PriceContext.Provider>
  );
};

export default Data;
