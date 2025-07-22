import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserBookList = ({ books }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const navigate = useNavigate();

  if (!books || books.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No books found.</p>;
  }

  return (
    <div className="flex relative">
      <div className="w-full md:w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-50">
        {books.map((book) => (
          <div
            key={book.id}
            onMouseEnter={() => setHoveredBook(book)}
            onMouseLeave={() => setHoveredBook(book)}
            onClick={() => navigate(`/user/book/detail/${book.id}`)}
            className="bg-white rounded-lg shadow hover:shadow-xl hover:bg-gray-50 transition p-4 flex flex-col items-center text-center cursor-pointer"
          >
            {book.image && (
              <img
                src={`http://127.0.0.1:8000${book.image}`}
                alt={book.title}
                className="w-32 h-48 object-cover rounded"
              />
            )}
            <h3 className="mt-3 font-semibold text-gray-800">{book.title}</h3>
            <span className="text-sm text-gray-600">
              By {Array.isArray(book.author) ? book.author.join(", ") : book.author}
            </span>
          </div>
        ))}
      </div>

      {/* Book Preview */}
      {hoveredBook && (
        <div className="hidden md:block fixed right-4 top-19 w-80 bg-blue-900 text-white rounded-sm shadow-lg p-6 z-50 transition-opacity h-160 overflow-y-auto ">
          <img
            src={`http://127.0.0.1:8000${hoveredBook.image}`}
            alt={hoveredBook.title}
            className="w-32 h-48 mx-auto object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold text-center">{hoveredBook.title}</h2>
          <p className="text-sm text-center text-gray-200 mb-2">
            By {Array.isArray(hoveredBook.author) ? hoveredBook.author.join(", ") : hoveredBook.author}
          </p>
            <p
            className={`text-sm text-center font-bold leading-relaxed ${
              hoveredBook.is_available ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {hoveredBook.is_available ? 'In Stock' : 'Out of Stock'}
          </p>
          <p className="text-gray-200 text-sm leading-relaxed font-thin">
            {hoveredBook.description || "No description available."}
          </p>
          <button
            onClick={() => navigate(`/user/book/detail/${hoveredBook.id}`)}
            className="mt-6 w-full bg-white text-blue-900 font-semibold py-2 rounded hover:bg-gray-100 transition"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBookList;