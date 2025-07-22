import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastSeenId, setLastSeenId] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await API.get('book/notifications/unread/count/');
        setUnreadCount(res.data.unread_count);
      } catch (err) {
        console.error('Failed to fetch unread count');
      }
    };

    fetchUnreadCount();
  }, []);

  
  const handleBellClick = async () => {
    try {
      const res = await API.get('book/notifications/');
      const latest = res.data.data.slice(0, 5);
      setNotifications(latest);

      const newUnread = latest.find(n => !n.is_read && n.id !== lastSeenId);
      if (newUnread) {
        setLastSeenId(newUnread.id);
        toast.info(newUnread.message, {
          toastId: `notif-${newUnread.id}`,
        });
      }

      navigate('/user/inbox');
    } catch (err) {
      console.error('Failed to fetch notifications');
      navigate('/user/inbox');
    }
  };

  return (
    <div className="relative">
      <button onClick={handleBellClick} className="relative focus:outline-none">
        <FaBell className="text-3xl text-gray-700 " />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;
