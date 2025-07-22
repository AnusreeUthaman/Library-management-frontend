import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import BorrowingList from "../../admin/borrowingList/BorrowingList";

const StaffBorrowingList = () => {
  const [borrowings, setBorrowings] = useState([]);

  const fetchData = async () => {
    const res = await API.get("book/borrowings/returns/");
    setBorrowings(res.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BorrowingList/>
    </div>
  );
};

export default StaffBorrowingList;
