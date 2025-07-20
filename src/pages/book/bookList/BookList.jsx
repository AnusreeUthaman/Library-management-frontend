import React, { useState,useEffect } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookList = () =>{
  const [books, setBooks] = useState([]);

  const navigate =useNavigate();
  const columns = [
    { title: "ID", key: "id" },
    { title: "Title", key: "title" },
    { title: "Authors", key: "authors" },
    { title: "Genre", key: "genre" },
    { title: "Condition", key: "condition" },
    { title: "Needs Replacement", key: "needs_replacement" },
    { title: "Publication Year", key: "publication_year" },
    { title: "ISBN-10", key: "isbn" },
    { title: "Number of Copies", key: "number_of_copies" },
    { title: "Available Copies", key: "available_copies" },
    { title:"Action",key:"action"}
   
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await API.get("book/list/");
        const formatted = response.data.data.map((book) => {
          return {
            id: book.id,
            title: book.title,
            authors: Array.isArray(book.author) ? book.author.join(", ") : "",
            genre: book.genre,
            condition: book.condition,
            needs_replacement: book.needs_replacement ? "Yes" : "No",
            publication_year: book.publication_year,
            isbn: book.isbn,
            number_of_copies: book.number_of_copies,
            available_copies: book.available_copies,
            action: (
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/edit/book/${book.id}`)}
                  className="bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ),

          };
        });
        setBooks(formatted);
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.detail || "Something went wrong",
          "error"
        );
      }
    };
    fetchBooks();
  }, []);
    const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (!confirmResult.isConfirmed) return;

    try {
      await API.delete(`book/delete/${id}/`);
      Swal.fire("Deleted!", "The book has been deleted.", "success");
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      Swal.fire("Error", "Something went wrong while deleting the book.", "error");
    }
  };
  return (
    <div className="max-w-7xl mx-auto mt-10 p-5 bg-white shadow-sm ">
      <h1 className="text-3xl font-bold p-3 text-cyan-800">Books List</h1>
      <Table columns={columns} data={books} />
    </div>
  );
};
export default BookList;