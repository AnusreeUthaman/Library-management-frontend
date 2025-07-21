import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table"; 

const BorrowingHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
 const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN"); // DD/MM/YYYY
};

  const fetchBorrowingHistory = async () => {
    try {
      const response = await API.get("book/borrowing/history/");
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching borrowing history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowingHistory();
  }, []);

  const columns = [
    { key: "book", title: "Book", render: (row) => row.book_title },
    { key: "due_date", title: "Due Date", render: (row) => formatDate(row.due_date) },
    { key: "return_date", title: "Return Date",render: (row) => formatDate(row.return_date)  },
    { key: "status", title: "Status", render: (row) => (<span className={`font-extrabold px-2 py-1 rounded ${row.return_date ? "text-green-600 bg-green-100" : "text-yellow-500 "}`}>
      {row.return_date ? "Returned" : "Borrowed"}
    </span>
  )
}

  ];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold p-4 text-cyan-800">Your Borrowings</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        
        <Table columns={columns} data={data} />
      )}
    </div>
  );
};

export default BorrowingHistory;
