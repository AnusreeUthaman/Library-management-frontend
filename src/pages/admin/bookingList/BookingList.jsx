import React, { useEffect, useState } from 'react';
import API from '../../../api/axiosInstance';
import Table from '../../../components/Table/Table';
import { toast } from 'react-toastify';

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get('book/booking/list/');
      const pending = res.data.data.filter(b => b.status === 'pending');
      setBookings(pending);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

 
  const handleApprove = async (id) => {
    try {
      const res = await API.put(`book/bookings/approve/${id}/`);
      toast.success(res.data.message);
      fetchBookings();
    } catch (err) {
      toast.error("Error approving booking");
    }
  };

  
  const handleReject = async (id) => {
    try {
      const res = await API.put(`book/bookings/reject/${id}/`);
      toast.info(res.data.message);
      fetchBookings();
    } catch (err) {
      toast.error("Error rejecting booking");
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
      <span className="capitalize bg-yellow-500 text-white px-2 py-1 rounded text-xs">
        {booking.status}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleApprove(booking.id)}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(booking.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
        >
          Reject
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold p-4 text-cyan-800">Pending Booking Requests</h2>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default AdminBookingList;