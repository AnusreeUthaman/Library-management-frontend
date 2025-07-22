import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import { MdClear } from "react-icons/md";

const FilterBar = ({ filters, setFilters }) => {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const gRes = await API.get("book/genres/");
        setGenres(gRes.data.data);

        const aRes = await API.get("book/authors/");
        setAuthors(aRes.data.data);
      } catch (err) {
        console.error("Failed to load filters", err);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({ genre: "", author: "", year: "" });
  };
  return (
    <div className="flex ml-50 flex-wrap gap-6 bg-white py-3 px-2 text-sm">
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="bg-white px-2 py-1 text-gray-700 rounded hover:text-slate-900 font-serif"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>

      <select
        name="author"
        value={filters.author}
        onChange={handleChange}
        className="bg-white px-2 py-1 text-gray-700 rounded hover:text-slate-900 font-serif"
      >
        <option value="">All Authors</option>
        {authors.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="year"
        value={filters.year}
        onChange={handleChange}
        placeholder="Year"
        className="px-2 py-1 w-24 text-gray-700 rounded bg-white"
      />
      <button
        onClick={handleReset}
        className="flex items-center gap-1 px-5 font-serif bg-white border border-gray-200 text-blue-600 rounded hover:bg-blue-100 transition"
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;