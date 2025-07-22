import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import Navbar from '../../navbar/Navbar';
import { toast } from 'react-toastify';


const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
        const res = await API.get('book/notifications/');
        setNotifications(res.data.data);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    const markAsRead = async (id) => {
      try {
        await API.put(`book/notifications/mark/read/${id}/`);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      } catch (err) {
        console.error('Failed to mark as read', err);
      }
    };
    
  const markAllAsRead = async () => {
    try {
      await API.put('book/notifications/mark/read/');
      setNotifications(prev =>
        prev.map(n => ({ ...n, is_read: true }))
      );
      toast.success("All notifications marked as read.");
    } catch (err) {
      console.error("Failed to mark all as read", err);
      toast.error("Failed to mark notifications.");
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 

  return (
      <>
      <div>
      <Navbar/>
      </div>
  
      <div className="max-w-5xl mx-auto mt-6 py-5 px-8 border border-gray-300 shadow-xl ">
        <h2 className="text-2xl text-gray-700 mb-5 ml-100 flex items-center font-serif gap-2">Notifications</h2>

      {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <>
            <div className="mb-4">
              <button
                onClick={markAllAsRead}
                className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-200 transition"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-5">
              {notifications.map(n => (
                <div
                  key={n.id}
                  className={`p-4 rounded shadow border border-gray-400 ${
                    n.is_read ? 'bg-gray-100' : 'bg-yellow-100 font-bold'
                  }`}
                >
                  <p className="font-medium">{n.message}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(n.created_at).toLocaleString()}
                  </div>

                  {!n.is_read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Notification;