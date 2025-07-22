import React, { useState, useEffect } from 'react';
//import './App.css';
import DropDown from './dropdown';
import Search from './search.jsx';
import axios from 'axios';

function App() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [query, setQuery] = useState(['']);
  const [data, setData] = useState(null);

  const selectedValue = selectedOption.map(option => option.value).join(',');
  const payload = {
    values: selectedOption,
    querries: query,
    valuesString: selectedValue,
  };

  const sendingData = async () => {
    const response = await axios.post('http://localhost:5000/api', payload);
    setData(response.data);
  };

  const handleChange2 = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <div>
      <DropDown selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Search query={query} setQuery={setQuery} />
      <button onClick={sendingData}>Submit</button>
      <button onClick={handleChange2}>Reset</button>

      {data && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results:</h2>

          {/* Float Data */}
          {data.float.length > 0 && (
            <div>
              <h3>Percentages:</h3>
              <ul>
                {data.float.map((item, index) => (
                  <li key={index}>
                    {item.key}: {(item.result * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Integer Data */}
          {data.int.length > 0 && (
            <div>
              <h3>Integer Values:</h3>
              <ul>
                {data.int.map((item, index) => (
                  <li key={index}>
                    {item.key}: {item.result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* String Data */}
          {data.string.length > 0 && (
            <div>
              <h3>Text Information:</h3>
              <ul>
                {data.string.map((item, index) => (
                  <li key={index}>
                    {item.key}: {item.result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Nulls */}
          {data.null.length > 0 && (
            <div>
              <h3>No Response:</h3>
              <ul>
                {data.null.map((item, index) => (
                  <li key={index}>{item.key}: No response</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
