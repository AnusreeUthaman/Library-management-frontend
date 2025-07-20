// import React, { useEffect, useState } from "react";
// import API from "../../../api/axiosInstance";
// import Swal from "sweetalert2";
// import { useParams, useNavigate } from "react-router-dom";
// import ReviewAndRating from "../../reviews/ReviewAndRating";
// import BookingButton from "../../../components/UI/button/BookingButton";
// import { FaArrowLeft, FaBookOpen, FaCalendarAlt, FaBarcode, FaLayerGroup } from "react-icons/fa";
// import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";


// const BookDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [bookData, setBookData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await API.get(`book/detail/${id}/`);
//         setBookData(response.data.data);
//       } catch (error) {
//         Swal.fire(
//           "Error",
//           error?.response?.data?.detail || "Unable to fetch book details.",
//           "error"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   if (loading) {
//     return <div className="p-4 text-gray-500">Loading book details…</div>;
//   }

//   if (!bookData) {
//     return <div className="p-4 text-red-600">Book not found</div>;
//   }

//   const book = bookData.books;
//   const images = bookData.images;

//   return (

// <div className="max-w-6xl mx-auto p-4 space-y-6">
//   <button
//     onClick={() => navigate(-1)}
//     className="flex items-center text-blue-600 hover:underline"
//   >
//     <FiChevronLeft className="mr-1" />
//     Back
//   </button>

//   {/* Image + Details Row */}
//   <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded shadow">
//     {/* Book Image */}
//     <div className="flex-shrink-0">
//       {book.image && (
//         <img
//           src={`http://127.0.0.1:8000${book.image}`}
//           alt={book.title}
//           className="w-64 h-auto object-cover rounded"
//         />
//       )}
//     </div>

//     {/* Book Info */}
//     <div className="flex flex-col justify-between space-y-3">
//       <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
//       <p className="text-gray-700">{book.description}</p>

//       <div><span className="font-semibold">By:</span> {book.author?.map((a) => a.name).join(", ")}</div>
//       <div><span className="font-semibold">Genre:</span> {book.genre?.name}</div>
//       <div><span className="font-semibold">Published:</span> {book.publication_year}</div>
//       <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>
//       <div><span className="font-semibold">Number of Copies:</span> {book.number_of_copies}</div>
//       <div><span className="font-semibold">Available Copies:</span> {book.available_copies}</div>

//       {/* Booking Button */}
//       <div className="mt-4">
//         <BookingButton book_id={id} />
//       </div>
//     </div>
//   </div>

//   {/* Additional Images */}
//   {images?.length > 0 && (
//     <div className="mt-6">
//       {/* <span className="font-semibold">Additional Images:</span> */}
//       <div className="flex flex-wrap gap-3 mt-2">
//         {images.map((img, idx) => (
//           <img
//             key={idx}
//             src={`http://127.0.0.1:8000${img.images}`}
//             alt={`Additional ${idx}`}
//             className="w-20 h-28 object-cover rounded shadow"
//           />
//         ))}
//       </div>
//     </div>
//   )}

//   {/* Reviews */}
//   <div className="mt-10">
//     <ReviewAndRating bookId={id} />
//   </div>
// </div>
//   );
// };

// export default BookDetail;

import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import ReviewAndRating from "../../reviews/ReviewAndRating";
import BookingButton from "../../../components/UI/button/BookingButton";
import { FiChevronLeft } from "react-icons/fi";
import { FaUser, FaTags, FaCalendarAlt, FaBarcode, FaCheckCircle } from "react-icons/fa";
import BookImages from "../../../components/bookImages/BookImages";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await API.get(`book/detail/${id}/`);
        setBookData(response.data.data);
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.detail || "Unable to fetch book details.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className="p-4 text-gray-500">Loading book details…</div>;
  if (!bookData) return <div className="p-4 text-red-600">Book not found</div>;

  const book = bookData.books;
  const images = bookData.images;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <BookImages book={book} images={images} />
        </div>

        <div className="flex-1 flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">
            {book.title}
          </h1>

      <div className="flex gap-2 mt-1">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
          #bestseller
        </span>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-md pt-4">

        <div className="flex items-center gap-3">
          <FaUser className="text-blue-600" />
          <div>
            <p className="text-gray-500 font-medium">By</p>
            <p className="text-gray-800 font-semibold">
              {book.author?.map((a) => a.name).join(", ")}
            </p>
          </div>
        </div>


        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-teal-500" />
          <div>
            <p className="text-gray-500 font-medium">Published</p>
            <p className="text-gray-800 font-semibold">{book.publication_year}</p>
          </div>
        </div>


        <div className="flex items-center gap-3">
          <FaTags className="text-pink-500" />
          <div>
            <p className="text-gray-500 font-medium">Genre</p>
            <p className="text-gray-800 font-semibold">{book.genre?.name}</p>
          </div>
        </div>

      

        <div className="flex items-center gap-3">
          <FaBarcode className="text-purple-500" />
          <div>
            <p className="text-gray-500 font-medium">ISBN-10</p>
            <p className="text-gray-800 font-semibold">{book.isbn}</p>
          </div>
        </div>

        
        <div className="flex items-center gap-3">
          <FaCheckCircle
            className={`${
              book.available_copies > 0 ? "text-green-600" : "text-red-600"
            }`}
          />
          <div>
            <p className="text-gray-500 font-medium">In stock</p>
            <p
              className={`font-semibold ${
                book.available_copies > 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              {book.available_copies > 0
                ? `${book.available_copies} copies`
                : "Not available"}
            </p>
            </div>
          </div>
        </div>

    
        <div className="pt-4 ">
          <BookingButton book_id={book.id} available_copies={book.available_copies} />
        </div>
        </div>
      </div>

    
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">About this book</h2>
        <p className="text-gray-600 font-serif leading-relaxed">{book.description}</p>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <ReviewAndRating bookId={id} />
      </div>
    </div>
  );
};

export default BookDetail;
