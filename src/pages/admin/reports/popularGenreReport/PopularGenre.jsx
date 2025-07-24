import React, { useEffect, useState } from "react";
import API from "../../../../api/axiosInstance";
import LineChartComponent from "../../../../components/chart/LineChart";

const PopularGenresReport = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchPopularGenres = async () => {
      try {
        const res = await API.get("book/report/popular/genres/");
        setGenres(
          res.data.data.map((genre) => ({
            name: genre.name,
            book_count: genre.book_count,
          }))
        );
      } catch (error) {
        console.error("Error fetching popular genres", error);
      }
    };

    fetchPopularGenres();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 font-serif text-gray-700">🏷️ Most Popular Genres</h2>
      <LineChartComponent data={genres} xKey="name" yKey="book_count" color="#FBBF24" />
    </div>
  );
};

export default PopularGenresReport;
