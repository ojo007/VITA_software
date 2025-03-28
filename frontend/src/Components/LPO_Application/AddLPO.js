import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './AddLPO.css'; // Import the CSS file
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import AppTable from './AppTable'; // Import AppTable component

const AddLPO = () => {
    const [results, setResults] = useState([]);
    const [items, setItems] = useState([]); // State to store list of item data

    const handleAddItem = (data) => {
        setItems([...items, data]);
    };

    const tableRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => tableRef.current,
    });

    return (
        <div className="wrapper">
            <div className="container1 a4-container">
                <form>
                    <div className='search-bar-container'>
                        <SearchBar setResults={setResults} onAddItem={handleAddItem} />
                        <SearchResults results={results} />
                    </div>
                </form>
                <div ref={tableRef} className="table-section-left">
                    <AppTable items={items} setItems={setItems} />
                </div>
                <div className="submit-button-container">
                    <button type="button" className="submit-button" onClick={handlePrint}>Print</button>
                </div>
                <div className='submit-button-container'>
                    <button type="button" className="submit-button">Go To Homepage</button>
                </div>
            </div>
        </div>
    );
};

export default AddLPO;
