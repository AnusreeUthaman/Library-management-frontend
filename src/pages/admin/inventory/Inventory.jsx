import React, { useEffect, useState } from 'react';
import API from '../../../api/axiosInstance';
import CountUp from 'react-countup';
import {FaBook, FaCheckCircle, FaExclamationTriangle,FaTools, FaBan, FaSyncAlt} from 'react-icons/fa';


const iconMap = {
  "Total Books": <FaBook size={28} className="text-white" />,
  "Available": <FaCheckCircle size={28} className="text-white" />,
  "Damaged": <FaExclamationTriangle size={28} className="text-white" />,
  "Under Maintenance": <FaTools size={28} className="text-white" />,
  "Lost": <FaBan size={28} className="text-white" />,
  "Needs Replacement": <FaSyncAlt size={28} className="text-white" />,
};


const gradientMap = {
  "Total Books": "bg-gradient-to-l from-blue-300 to-blue-500",
  "Available": "bg-gradient-to-l from-green-300 to-green-500",
  "Damaged": "bg-gradient-to-l from-yellow-200 to-yellow-500",
  "Under Maintenance": "bg-gradient-to-l from-orange-300 to-orange-500",
  "Lost": "bg-gradient-to-l from-red-300 to-red-500",
  "Needs Replacement": "bg-gradient-to-l from-purple-300 to-purple-500",
};

const Inventory = () => {
  const [data, setData] = useState(null);

  const fetchInventory = async () => {
    try {
      const res = await API.get('book/inventory/dashboard/');
      setData(res.data.data);
    } catch (err) {
      console.error('Error fetching inventory data', err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  if (!data) return <p className="text-center mt-10 text-gray-600">Loading inventory...</p>;

  const cards = [
    { title: 'Total Books', value: data.total_books },
    { title: 'Available', value: data.available },
    { title: 'Damaged', value: data.damaged },
    { title: 'Under Maintenance', value: data.under_maintenance },
    { title: 'Lost', value: data.lost },
    { title: 'Needs Replacement', value: data.needs_replacement },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((item) => (
          <Card key={item.title} title={item.title} value={item.value} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div
      className={`cursor-pointer p-4 rounded-xl shadow-md text-white flex items-center gap-4 transition transform hover:scale-105 ${gradientMap[title]}`}
    >
      <div>{iconMap[title]}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">
          <CountUp end={value} duration={1.5} />
        </p>
      </div>
    </div>
  );
};

export default Inventory;
