import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  // Fetch random quote from API
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Save quote to list
  const saveQuote = () => {
    if (!savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch initial quote on load
  }, []);

  return (
    <div className="app-container">
      <h1>Ron Swanson Quotes</h1>

      <div className="card">
        <p>{quote}</p>
        <button className="btn-fetch" onClick={fetchQuote}>New Quote</button>
        <button className="btn-save" onClick={saveQuote}>Save to List</button>
      </div>

      <h2>Saved Quotes</h2>
      <div className="saved-quotes">
        {savedQuotes.length === 0 ? (
          <p>No saved quotes yet.</p>
        ) : (
          savedQuotes.map((savedQuote, index) => (
            <div key={index} className="saved-quote-card">
              <p>{savedQuote}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
