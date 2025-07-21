import React, { useEffect, useState } from 'react';
import API from '../../../api/axiosInstance';
import Table from '../../../components/Table/Table';
import { toast } from 'react-toastify';


const BookingIssueList = () => {
const [bookings, setBookings] = useState([]);

  const fetchApprovedBookings = async () => {
    try {
      const res = await API.get('book/bookings/approved/');
      const approved = res.data.data.filter(b => b.status === 'approved');
      setBookings(approved);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load approved bookings.");
    }
  };

  useEffect(() => {
    fetchApprovedBookings();
  }, []);

  const handleIssue = async (id) => {
    try {
      const res = await API.post(`book/borrowings/issue/${id}/`);
      toast.success(res.data.message || "Book issued successfully.");
      fetchApprovedBookings();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error issuing book.");
    }
  };

  const columns = [
    { key: 'image', title: 'Cover' },
    { key: 'book_title', title: 'Book Title' },
    { key: 'username', title: 'User' },
    { key: 'status', title: 'Status' },
    { key: 'actions', title: 'Actions' },
  ];

  const data = bookings.map((booking) => ({
    image: (
      <img
        src={`http://localhost:8000${booking.book_image}` || '/placeholder.jpg'}
        alt="cover"
        className="w-12 h-16 object-cover rounded"
      />
    ),
    book_title: booking.book_title,
    username: booking.username,
    status: (
      <span className="capitalize bg-green-500 text-white px-2 py-1 rounded text-xs">
        {booking.status}
      </span>
    ),
    actions: (
      <button
        onClick={() => handleIssue(booking.id)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
      >
        Issue
      </button>
    ),
  }));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold p-4 text-cyan-800">Books Ready to Be Issued</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};


export default BookingIssueList;
