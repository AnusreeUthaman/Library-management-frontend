import React from "react";
import { FiSearch } from "react-icons/fi";


const SearchBar = ({ search, setSearch, onSearch }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="w-2xl max-w-6xl mx-auto flex ml-40  bg-white border border-gray-200 rounded-md overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search for books, authors, ISBN, genres..."
        className="flex-grow px-4 py-2 bg-white text-sm text-gray-800 outline-none "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="px-4 py-2 text-blue-600 hover:bg-gray-100 ">
        <FiSearch size={20} />
      </button>

    </form>
  );
};

export default SearchBar;