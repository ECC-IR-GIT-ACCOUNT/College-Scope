import React, { useState, useEffect } from 'react';
import './App.css';
import DropDown from './dropdown';
import Search from './search.jsx';
import axios from 'axios';

const URL = import.meta.env.VITE_URL;


function App() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);

  const selectedValue = selectedOption.map(option => option.value).join(',');
  const payload = {
    values: selectedOption,
    querries: query,
    valuesString: selectedValue,
  };

  const sendingData = async () => {
    try{
    const response = await axios.post(URL, payload);
    setData(response.data);}
    catch(error){
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleChange2 = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div className="app-container">
      {/* Left Panel - Controls */}
      <div className="left-panel">
        <Search query={query} setQuery={setQuery} />
        <DropDown selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        
        <div className="button-group">
          <button className="btn btn-primary" onClick={sendingData}>
            Submit
          </button>
          <button className="btn btn-secondary" onClick={handleChange2}>
            Reset
          </button>
        </div>
      </div>

      {/* Right Panel - Results */}
      <div className="right-panel">
        {data ? (
          <div className="results-container">
            <h2 className="results-title">Search Results</h2>

            {/* Float Data - Percentages */}
            {data.float && data.float.length > 0 && (
              <div className="data-section">
                <h3 className="section-title">📊 Percentages</h3>
                <div className="data-grid">
                  {data.float.map((item, index) => (
                    <div key={index} className="data-card percentage">
                      <div className="card-label">{item.key}</div>
                      <div className="card-value">{Math.round((item.result * 100))}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integer Data */}
            {data.int && data.int.length > 0 && (
              <div className="data-section">
                <h3 className="section-title">🔢 Numerical Values</h3>
                <div className="data-grid">
                  {data.int.map((item, index) => (
                      (item.key==="Unit ID for Institution") ? ( 
                        <div key={index} className="data-card integer">
                        <div className="card-label">{item.key}</div>
                      <div className="card-value">{item.result}</div>
                      </div>
                      ) :(
                        <div key={index} className="data-card integer">
                      <div className="card-label">{item.key}</div>
                      <div className="card-value">{item.result.toLocaleString()}</div>
                      </div>
                      ) 
                  ))}
                </div>
              </div>
            )}

            {/* String Data */}
            {data.string && data.string.length > 0 && (
              <div className="data-section">
                <h3 className="section-title">📝 Information</h3>
                <div className="data-grid">
                  {data.string.map((item, index) => (
                    <div key={index} className="data-card text">
                      <div className="card-label">{item.key}</div>
                      <div className="card-value">{item.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Null Data */}
            {data.null && data.null.length > 0 && (
              <div className="data-section">
                <h3 className="section-title">❌ No Data Available</h3>
                <div className="data-grid">
                  {data.null.map((item, index) => (
                    <div key={index} className="data-card null">
                      <div className="card-label">{item.key}</div>
                      <div className="card-value">No response</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="results-container">
            <div className="empty-state">
              <h3>Ready to Search</h3>
              <p>Select your options and enter a search term to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;