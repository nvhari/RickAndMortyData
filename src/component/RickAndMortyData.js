import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RickAndMortyData = () => {
  const [dataType, setDataType] = useState('character'); // Default value is 'character'
  const [items, setItems] = useState([]); // State to store fetched data

  useEffect(() => {
    // Fetch data based on dataType whenever dataType changes
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/${dataType}`);
        setItems(response.data.results); // Update items with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dataType]); // Dependency on dataType to refetch data when it changes

  // Handle data type selection from the dropdown
  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  return (
    <div>
      <h1>Rick and Morty {dataType.charAt(0).toUpperCase() + dataType.slice(1)}</h1>
      
      {/* Dropdown menu for selecting data type */}
      <select value={dataType} onChange={handleDataTypeChange}>
        <option value="character">Characters</option>
        <option value="episode">Episodes</option>
        <option value="location">Locations</option>
      </select>
      
      {/* Display fetched data */}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.id} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RickAndMortyData;
