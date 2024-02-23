import React, { useState } from 'react';
import VideoSlider from './videoSlider'; 


const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<searchResult[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormVisible(true);
    const response = await fetch('/api/youtubeSearch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTerm }),
    });

    if (response.ok) {
      const data = await response.json();
      setSearchResults(data); 
    } else {
      console.error('Search failed with status: ' + response.status + ' and message: ' + response.statusText);
    }
  };

  return (
    <div style={divStyle}> 
    <h1 style={firstHeaderStyle}>Search for videos here</h1>
    <div style={secondHeaderStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange} 
          placeholder="Enter search term"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} className="text-white hover:text-customPink">Search</button>
      </form>
      </div>
  {isFormVisible && 
      <VideoSlider searchResults={searchResults} />
    }
    </div>
  );
};

const divStyle: React.CSSProperties = {
  maxWidth: '800px',
   margin: 'auto'
}

const firstHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center'
}

const secondHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#2b2a2e',
  color: 'white',
  borderRadius: '10px 0px 0px 10px'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  cursor: 'pointer',
  backgroundColor: '#000000',
  borderRadius: '0px 10px 10px 0px'
};

export default SearchPage;
