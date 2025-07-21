import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table";
import { toast } from "react-toastify";

const BorrowingList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const res = await API.get("/book/borrowing/list/");
        const formatted = res.data.data.map((b) => ({
         
          book_title: b.book_title || "-",
          user: b.username || "-",
          due_date: b.due_date ? new Date(b.due_date).toLocaleDateString():null,
          return_date: b.return_date
            ? new Date(b.return_date).toLocaleDateString()
            : null,
          penalty_paid: b.penalty_paid > 0 ? `₹${b.penalty_paid}` : "None",
          status: b.return_date ? "Returned" : "Issued",
          
        }));
        setData(formatted);
      } catch (err) {
        console.error("Error fetching borrowings:", err);
      }
    };

    fetchBorrowings();
  }, []);

  const columns = [
    
    { title: "Book Title", key: "book_title" },
    { title: "User", key: "user" },
    { title: "Due Date", key: "due_date" },
    {
      title: "Status",
      key: "status",
      render: (row) =>
        row.status === "Returned" ? (
          <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full font-medium">
            Returned
          </span>
        ) : (
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded-full font-medium">
            Issued
          </span>
        ),
    },
    {
      title: "Return Date",
      key: "return_date",
      render: (row) => row.return_date || <span className="text-gray-400">Not returned</span>,
    },
    
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold p-4 text-cyan-800">Borrowing List</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default BorrowingList;
