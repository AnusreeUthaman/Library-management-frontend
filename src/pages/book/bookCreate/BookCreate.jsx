import { useEffect, useState } from "react";
import BookForm from "../../../components/bookForm/BookForm";
import Swal from "sweetalert2";
import API from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const BookCreate = ({ }) => {
  const [authorsList, setAuthorsList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorsAndGenres = async () => {
      try {
        const authorsRes = await API.get("book/authors/");
        const genresRes = await API.get("book/genres/");
        // console.log("Authors Response:", authorsRes.data.data);
        // console.log("Genres Response:", genresRes.data.data);
        setAuthorsList(authorsRes.data.data || []);
        setGenreList(genresRes.data.data || []);
      } catch (error) {
        Swal.fire(
          "Error",
          "Could not fetch authors or genres",
          "error"
        );
      }
    };
    fetchAuthorsAndGenres();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await API.post("book/add/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success", "Book Created!", "success");
      navigate('/list')
    } catch (error) {
      if( error.response?.data?.title){
          Swal.fire("Error","A book with this title already exists","error")
        }else{
          Swal.fire("Error",error?.respone?.data?.detail || "something went wrong","error")
        }
      navigate('/book/add')
    }
  };
  
  return (
    <div>
      <BookForm
        authors={authorsList}
        genre={genreList}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BookCreate;
