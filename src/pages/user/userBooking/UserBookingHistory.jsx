import React, { useEffect, useState } from 'react';
import API from '../../../api/axiosInstance';
import Table from '../../../components/Table/Table';
import Swal from 'sweetalert2';

const UserBookingHistory = () => {
   const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  
  const fetchUserProfile = async () => {
    try {
      const res = await API.get('user/profile/');
      setUser(res.data);
    } catch (err) {
      console.error('User not logged in');
    }
  };

  
  const fetchBookings = async () => {
    try {
      const res = await API.get('book/user/booking/list/');
      console.log("Raw booking data:", res.data.data);
      setBookings(res.data.data || []);
    } catch (error) {
      console.error('Error fetching booking history:', error);
    }
  };

 
  const handleCancel = async (bookingId) => {
    const confirm = await Swal.fire({
      title: 'Cancel Booking?',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (confirm.isConfirmed) {
      try {
        await API.put(`book/booking/cancel/${bookingId}/`);
        fetchBookings();
        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to cancel booking.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchBookings();
  }, []);

  const columns = [
    {
  key: 'image',
  title: 'Cover',
  render: (row) => (
    <img
      src={`http://localhost:8000${row.book_image}`}
      alt="Book Cover"
      className="w-12 h-16 object-cover rounded"
    />
  )
    },
    {
      title: 'Book Title',
      key: 'book_title',
      render: (row) => row.book_title || '-',
    },
    {
      title: 'Booking Date',
      key: 'created_at',
      render: (row) =>
        new Date(row.created_at).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
    },
    {
      title: 'Status',
      key: 'status',
      render: (row) => {
        const rawStatus = row.status
        const colorMap = {
          pending: 'bg-yellow-100 text-yellow-700',
          approved: 'bg-green-100 text-green-700',
          rejected: 'bg-red-100 text-red-700',
          cancelled: 'bg-orange-100 text-orange-700',
          returned: 'bg-gray-200 text-gray-700',
          
        };

        const displayMap = {
          pending: 'Pending',
          approved: 'Approved',
          rejected: 'Rejected',
          cancelled: 'Cancelled',
        };

        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              colorMap[rawStatus] || 'bg-gray-100 text-gray-500'
            }`}
          >
            {displayMap[rawStatus] || rawStatus}
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (row) =>
        row.status === 'pending' ? (
          <button
            onClick={() => handleCancel(row.id)}
            className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        ) : (
          <span className="text-gray-400 text-xs">No action</span>
        ),
    },
  ];

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500 text-xl">
        Please login to view your bookings.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold p-4 text-cyan-800">Your Booking History</h2>
      <Table columns={columns} data={bookings} />
    </div>
  );
};


export default UserBookingHistory;
