import React,{ useState,useEffect } from "react";
import API from "../../../../api/axiosInstance";
import LineChartComponent from "../../../../components/chart/LineChart";

const UserActivityReport = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await API.get("book/report/user/activity/");
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching user activity", error);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 font-serif text-gray-700">🧑‍💻 Most Active Users</h2>
      <LineChartComponent data={users} xKey="username" yKey="total_bookings" color="#60A5FA" />
      
    </div>
  );
};
export default UserActivityReport;