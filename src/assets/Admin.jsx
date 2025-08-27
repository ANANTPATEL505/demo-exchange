import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newToken, setNewToken] = useState({ name: '', symbol: '', id: '' });
  const [editingToken, setEditingToken] = useState(null); // Store the token being edited

  // Fetch the token data from the database
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tokens');
        setTokens(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tokens');
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Handle form input changes for new tokens
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewToken((prevToken) => ({
      ...prevToken,
      [name]: value,
    }));
  };

  // Handle form submission for adding new tokens
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/tokens', newToken);
      setTokens((prevTokens) => [...prevTokens, response.data]);
      setNewToken({ name: '', symbol: '', id: '' }); // Clear form
      setError(null);
    } catch (err) {
      setError('Failed to add token');
    }
  };

  // Handle input changes for editing a token
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingToken((prevToken) => ({
      ...prevToken,
      [name]: value,
    }));
  };

  // Handle token update
  const handleUpdateToken = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tokens/${id}`, editingToken);
      setTokens((prevTokens) => prevTokens.map((token) => (token._id === id ? response.data : token)));
      setEditingToken(null); // Clear editing state
    } catch (err) {
      setError('Failed to update token');
    }
  };

  // Handle token deletion
  const handleDeleteToken = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tokens/${id}`);
      setTokens((prevTokens) => prevTokens.filter((token) => token._id !== id));
    } catch (err) {
      setError('Failed to delete token');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page - Token Data</h1>

      {/* Form to add new token */}
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block">Token Name:</label>
          <input
            type="text"
            name="name"
            value={newToken.name}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block">Token Symbol (e.g., BINANCE:BTCUSDT):</label>
          <input
            type="text"
            name="symbol"
            value={newToken.symbol}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block">Token ID:</label>
          <input
            type="text"
            name="id"
            value={newToken.id}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Token
        </button>
      </form>

      {/* Display existing tokens */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token._id}>
                {editingToken && editingToken._id === token._id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="id"
                        value={editingToken.id}
                        onChange={handleEditChange}
                        className="border p-2"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={editingToken.name}
                        onChange={handleEditChange}
                        className="border p-2"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="symbol"
                        value={editingToken.symbol}
                        onChange={handleEditChange}
                        className="border p-2"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleUpdateToken(token._id)} className="bg-green-500 text-white px-4 py-2">
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{token.id}</td>
                    <td className="border px-4 py-2">{token.name}</td>
                    <td className="border px-4 py-2">{token.symbol}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => setEditingToken(token)} className="bg-yellow-500 text-white px-4 py-2">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteToken(token._id)}
                        className="bg-red-500 text-white px-4 py-2 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
