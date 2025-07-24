import React, { useEffect, useState } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table";

const FlaggedBooks = () => {
  const [data, setData] = useState([]);


  const fectchFlaggedBooks = async ()=>{
    try{
      const res = await API.get('book/flagged/books');
      setData(res.data.data);
    }catch(error){
        console.error("failed to fetch flagged books")
        setData([])
    }
  }

  useEffect(()=>{
    fectchFlaggedBooks();
  },[])

  const columns = [
    
    { title: "Title", key: "title" },
    {
      title: "Condition",
      key: "condition",
      render: (row) => (
        <span className="bg-red-100 text-red-700 px-2 py-1 text-xs rounded-full font-medium">
          {row.condition}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold p-4 text-cyan-800">Flagged Books</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default FlaggedBooks;
