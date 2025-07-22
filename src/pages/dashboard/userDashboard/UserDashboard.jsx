import UserSidebar from "../../../sidebar/userSidebar";
import { Outlet } from "react-router-dom";
import UserBookList from "../../user/userBookList/UserBookLIst";
import Navbar from "../../../navbar/Navbar";
import SearchBar from "../../../components/UI/inputs/SearchBar";
import FilterBar from "../../../components/UI/inputs/Filter";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import API from "../../../api/axiosInstance";


const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    year: "",
  });

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams({ search, ...filters });
      const res = await API.get(`book/list/?${params.toString()}`);
      setBooks(res.data.data || []);
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire("Error", "Could not fetch books.", "error");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, JSON.stringify(filters)]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <UserSidebar />
        <div className="ml-20 md:ml-64 p-4 flex-1 mt-15">
          <SearchBar search={search} setSearch={setSearch} onSearch={fetchBooks} />
          <FilterBar filters={filters} setFilters={setFilters} onApply={fetchBooks} />
          <Outlet />
          <div className="space-y-10">
            <UserBookList books={books} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;