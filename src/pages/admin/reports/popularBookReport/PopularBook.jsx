import React, { useEffect, useState } from "react";
import API from "../../../../api/axiosInstance";
import LineChartComponent from "../../../../components/chart/LineChart";

const PopularBooksReport = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const res = await API.get("book/report/popular/books");
        setBooks(res.data.data.map(book => ({
          title: book.title,
          borrow_count: book.borrow_count
        })));
      } catch (error) {
        console.error("Error fetching popular books", error);
      }
    };

    fetchPopularBooks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 font-serif text-gray-700">📚 Most Borrowed Books</h2>
      <LineChartComponent data={books} xKey="title" yKey="borrow_count" color="#34D399" />
    </div>
  );
};

export default PopularBooksReport;
