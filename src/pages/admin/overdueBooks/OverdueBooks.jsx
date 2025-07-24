import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table";

const OverdueBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOverdueBooks = async () => {
      try {
        const res = await API.get("book/overdue/books/");
        setData(res.data.data);  
      } catch (error) {
        console.error("Failed to fetch overdue books:", error);
        setData([]);
      }
    };

    fetchOverdueBooks();
  }, []);

  const columns = [
   
    { title: "Title", key: "book_title" },
    { title: "User", key: "username" },
    { title: "Due Date", key: "due_date" },
    {
      title: "Days Overdue",
      key: "days_overdue",
      render: (row) => {
        const due = new Date(row.due_date).toLocaleDateString("en-IN");
        const now = new Date();
        // 1sec*1min*1hr*1day (round whole num)
        const diff = Math.ceil((now - due) / (1000 * 60 * 60 * 24)); 
        return <span className="text-red-500">{diff} days</span>;
      },
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold p-4 text-cyan-800"> Overdue Books</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default OverdueBooks;
