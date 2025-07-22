import React, { useState, useEffect } from 'react';
import API from '../../../api/axiosInstance';

import Swal from 'sweetalert2';

const BookingButton = ({ book_id,available_copies }) => {
 
  const [hasBooked, setHasBooked] = useState(false);
  const [hasReturned, setHasReturned] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const fetchUserBookings = async () => {
    try {
      const res = await API.get('book/user/booking/list/');

      const bookings = res.data?.data || [];

      // Filter for this book
      const thisBookBooking = bookings.find(b => b.book === parseInt(book_id));

      if (thisBookBooking) {
        setHasBooked(true);
        setHasReturned(thisBookBooking.status === 'returned');
      } else {
        setHasBooked(false);
        setHasReturned(false);
      }
    } catch (err) {
      console.error('Error fetching user bookings', err);
    } finally {
      setLoading(false);
    }
  };


  const handleBookNow = async () => {
    try {
      const res = await API.post('book/user/add/booking/', { book: book_id });
      // console.log("Book Now clicked for book:", book_id);
      if (res.data.success) {
        Swal.fire("Success",'Booking successful!',"success");
        setHasBooked(true);
        setHasReturned(false);
      }
    } catch (err) {
      console.error('Booking Error:', err.response?.data || err.message);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text:err.response?.data?.message || 'Booking failed',
      });
      
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [book_id]);

  if (loading) return <p className="text-gray-500">Checking booking status...</p>;
  
  if (available_copies === 0) {
      return (
        <button
          disabled
          className="bg-red-500 text-white px-4 py-2 rounded "
        >
          Out of Stock
        </button>
      );
    }
  return (
    <div className="mt-4">
      {hasBooked ? (
        hasReturned ? (
          <button
            onClick={handleBookNow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          >
            Already Booked
          </button>
        )
      ) : (
        <button
          onClick={handleBookNow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Book Now
        </button>
      )}
    </div>
  );
};

export default BookingButton;
