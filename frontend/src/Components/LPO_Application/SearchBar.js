import React, { useState } from 'react';
import './SearchBar.css';
import ItemGrid from './ItemGrid';

const SearchBar = ({ setResults, onAddItem }) => {
    const [description, setDescription] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [erp, setErp] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemCodeUnit, setItemCodeUnit] = useState('');
    const [mainCategory, setMainCategory] = useState('');

    const fetchData = (value) => {
        fetch('http://localhost:8082/items_master')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.Items_Code_Description &&
                        user.Items_Code_Description.toLowerCase().includes(value)
                    );
                });
                setSuggestions(results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleChange = (value) => {
        setDescription(value);
        fetchData(value);
        setShowButton(false);
        setShowGrid(false);
    };

    const handleSelectSuggestion = (suggestion) => {
        setDescription(suggestion.Items_Code_Description);
        setSelectedResult(suggestion);
        setErp(suggestion.New_Code_ERP);
        setItemDescription(suggestion.Items_Code_Description);
        setItemCodeUnit(suggestion.Items_Code_Unit);
        setMainCategory(suggestion.Main_Category); // Update this line
        setSuggestions([]);
        setShowButton(true);
    };

    const handleInputFocus = () => {
        setSuggestions([]);
        setShowButton(false);
        setShowGrid(false);
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        if (selectedResult) {
            setShowGrid(true);
        }
    };

    return (
        <div>
            <div>
                <h2 className='d-flex justify-content-center align-items-center flex-column title-bg'>LPO APPLICATION</h2>
                <div className='mb-2'>
                    <label htmlFor='LPOApplication'><h5><strong>ITEM DESCRIPTION</strong></h5></label>
                    <input
                        type='text'
                        name='description'
                        id='item-box'
                        placeholder='Enter The Item Description'
                        className='form-control rounded-5'
                        value={description}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={handleInputFocus}
                        required
                    />
                    {suggestions.length > 0 && (
                        <div className="autocomplete">
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion.id}
                                    className="search-result"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion.Items_Code_Description}
                                </div>
                            ))}
                        </div>
                    )}
                    {showButton && (
                        <button className="search-button" onClick={handleButtonClick}>
                            Search For Material
                        </button>
                    )}
                </div>
                <div>
                    {showGrid && (
                        <ItemGrid
                            erp={erp}
                            itemDescription={itemDescription}
                            itemCodeUnit={itemCodeUnit}
                            mainCategory={mainCategory} // Pass mainCategory as a prop
                            onAddItem={onAddItem}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
