import Select from 'react-select';
import './dropdown.css';
import optionArray from './options.json';

function DropDown({ selectedOption, setSelectedOption }) {
  return (
    <div className="dropdown-wrapper">
      <h1>Select the Options</h1>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionArray}
        value={selectedOption}
        onChange={(selectedOption) => setSelectedOption(selectedOption)}
        classNamePrefix="react-select"
      />
      <p>{selectedOption.map(option => option.value).join(', ')}</p>
    </div>
  );
}

export default DropDown;
