import React, { useEffect, useState } from 'react';
import Timescale from './assets/1.jpeg';
import axios from 'axios';
import Image from './Image';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const performSearch = async () => {

      try {
        const response = await axios.post('http://localhost:3000/search', { searchText });
        setResults(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (clicked) {
      setClicked(false);
      performSearch();
    }
  }, [clicked]);

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <img src={Timescale} alt="logo" style={styles.logo} />
        <h1 style={styles.title}>Timescale Image Search Engine</h1>
      </div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          style={styles.input}
        />
        <button onClick={() => setClicked(true)} style={styles.button}>
          Search
        </button>
      </div>
      <div style={styles.resultsContainer}>
        {results.length > 0 && (
          <ul style={styles.resultsList}>
            {results.map((item, index) => (
              <li key={index} style={styles.resultItem}>
                <Image fileName={item.path} alt={searchText} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      textAlign: 'center',
      padding: '20px',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    logo: {
      width: '80px',
      height: '80px',
      marginRight: '10px',
    },
    title: {
      fontSize: '48px',
      color: '#F5FF80',
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: '20px',
    },
    input: {
      padding: '15px',
      borderRadius: '5px',
      border: '1px solid #F5FF80',
      marginRight: '10px',
      width: '50%',
    },
    button: {
      padding: '15px 15px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#F5FF80',
      color: 'black',
      cursor: 'pointer',
    },
    resultsContainer: {
      width: '100%',
      textAlign: 'center', // Center align the results container
    },
    resultsList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    resultItem: {
      margin: '10px',
      color: '#F5FF80',
      textAlign: 'center',
    },
  };
  
export default SearchBar;
