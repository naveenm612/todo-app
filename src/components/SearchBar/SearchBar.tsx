import React from 'react';
import './SearchBar.css';

type SearchBarProps = {
  onSearch: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Search todos... (Ctrl+K)"
      onChange={(e) => onSearch(e.target.value)}
      className="search"
    />
  </div>
);

export default SearchBar;