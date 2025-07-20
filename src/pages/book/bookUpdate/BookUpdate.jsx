import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../../components/bookForm/BookForm";

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [authorsList, setAuthorsList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsResponse = await API.get("book/authors/");
        setAuthorsList(authorsResponse.data.data || []);

        const genreResponse = await API.get("book/genres/");
        setGenreList(genreResponse.data.data || []);

        const bookResponse = await API.get(`book/detail/${id}/`);
        const bookData = bookResponse.data.data.books;

        
        const authors = Array.isArray(bookData.author) 
        ? bookData.author.map(a => String(a?.id)).filter(id => id !== "undefined")
        : bookData.author?.id 
          ? [String(bookData.author.id)]
        : [];

        const genre = bookData.genre?.id?.toString() || "";

        setInitialData({...bookData,
          author:authors,
          genre:genre,
          images: bookResponse.data.data?.images || []
      });

      } catch (error) {
        Swal.fire("Error", "Unable to load book data", "error");
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

const handleUpdate = async (formData) => {
  try {
    const response = await API.put(`book/update/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (response.status === 200) {
      Swal.fire("Success", "Book updated successfully", "success");
      navigate("/list");
    }
  } catch (error) {
    console.error("Update error:", error.response?.data);
    Swal.fire(
      "Error",
      error?.response?.data?.detail || 
      error?.response?.data?.message || 
      "Something went wrong",
      "error"
    );
  }
};
  if (!initialData) {
    return <div>Loading book details…</div>;
  }

  return (
    <div>
      <BookForm
        id={id}
        initialData={initialData}
        authors={authorsList}
        genre={genreList}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default BookEdit;
