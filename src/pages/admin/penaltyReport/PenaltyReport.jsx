import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table";

const PenaltyReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPenalties = async () => {
      try {
        const res = await API.get("book/penalty/report/");
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch penalty report", err);
        setData([]);
      }
    };

    fetchPenalties();
  }, []);

  const columns = [
    { title: "User", key: "username" },
    { title: "Book", key: "book_title" },
    {
      title: "Due Date",
      key: "due_date",
      render: (row) => new Date(row.due_date).toLocaleDateString("en-IN"),
    },
    {
      title: "Returned On",
      key: "return_date",
      render: (row) =>
        row.return_date
          ? new Date(row.return_date).toLocaleDateString("en-IN")
          : "Not returned",
    },
    {
      title: "Penalty (₹)",
      key: "penalty_paid",
      render: (row) => <span className="text-red-600">₹{row.penalty_paid}</span>,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">💰 Penalty Report</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default PenaltyReport;
