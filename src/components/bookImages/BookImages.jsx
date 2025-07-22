import React,{useState} from "react";

const BookImages = ({ book, images }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const mainImage = hoveredImage || book.image;

  return (
    <div className="flex flex-col items-center gap-4">
        {/* cover image */}
      <div className="w-64 h-96 rounded-lg overflow-hidden shadow bg-white">
        {mainImage && (
          <img
            src={`http://127.0.0.1:8000${mainImage}`}
            alt={book.title}
            className="w-full h-full object-cover transition duration-300"
          />
        )}
      </div>

      {/* Additional Images */}
      {images?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {images.map((img, id) => (
            <img
              key={id}
              src={`http://127.0.0.1:8000${img.images}`}
              alt={`Additional ${id}`}
              className="w-20 h-28 object-cover rounded shadow-sm border border-blue-400 transform transition duration-300 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredImage(img.images)}
              onMouseLeave={() => setHoveredImage(null)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookImages;