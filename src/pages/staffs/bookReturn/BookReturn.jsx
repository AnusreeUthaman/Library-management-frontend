import React, { useState,useEffect } from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import Table from "../../../components/Table/Table";
import { toast } from "react-toastify";

const ReturnBook = () => {
  const [data, setData] = useState([]);
  const [condition, setCondition] = useState({}); 

  const handleReturn = async (id) => {
    try {
      const res = await API.put(`book/borrowings/return/${id}/`, {
        condition: condition[id] || "available",
      });

      toast.success("Book returned successfully");

      const updatedData = data.map((item) =>
        item.id === id
          ? {
              ...item,
              return_date: new Date().toLocaleDateString(),
              status: "Returned",
              penalty_paid: res.data.penalty ? `₹${res.data.penalty}` : "None",
            }
          : item
      );
      setData(updatedData);
    } catch (err) {
      toast.error("Error returning book");
    }
  };

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const res = await API.get("/book/borrowing/list/");
        const formatted = res.data.data.map((b) => ({
          id: b.id,
          book_title: b.book_title || "-",
          user: b.username || "-",
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
    { title: "ID", key: "id" },
    { title: "Book Title", key: "book_title" },
    { title: "User", key: "user" },
    {
      title: "Condition",
      key: "condition",
      render: (row) =>
        row.status === "Issued" ? (
          <select
            value={condition[row.id] || "available"}
            onChange={(e) =>
              setCondition({ ...condition, [row.id]: e.target.value })
            }
            className="text-sm p-1 border rounded"
          >
            <option value="available">Available</option>
            <option value="damaged">Damaged</option>
            <option value="under_maintenance">Under Maintenance</option>
            <option value="lost">Lost</option>
          </select>
        ) : (
          "-"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (row) =>
        row.status === "Issued" ? (
          <button
            onClick={() => handleReturn(row.id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded"
          >
            Return
          </button>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    {
      title: "Penalty",
      key: "penalty_paid",
      render: (row) =>
        row.penalty_paid !== "None" ? (
          <span className=" text-red-700 px-2 py-1 text-xs rounded-full  font-bold">
            {row.penalty_paid}
          </span>
        ) : (
          <span className="text-gray-400 text-xs">-</span>
        ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold p-4 text-cyan-800"> Book Returns</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default ReturnBook;