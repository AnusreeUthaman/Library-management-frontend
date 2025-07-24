import React, { useEffect, useState } from "react";
import API from "../../../../api/axiosInstance";
import LineChartComponent from "../../../../components/chart/LineChart";

const PopularAuthorsReport = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchPopularAuthors = async () => {
      try {
        const res = await API.get("book/report/popular/authors/");
        setAuthors(
          res.data.data.map((author) => ({
            name: author.name,
            book_count: author.book_count,
          }))
        );
      } catch (error) {
        console.error("Error fetching popular authors", error);
      }
    };

    fetchPopularAuthors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold  mb-4 font-serif text-gray-700">👨‍💼 Most Popular Authors</h2>
      <LineChartComponent data={authors} xKey="name" yKey="book_count" color="#60A5FA" />
    </div>
  );
};

export default PopularAuthorsReport;
