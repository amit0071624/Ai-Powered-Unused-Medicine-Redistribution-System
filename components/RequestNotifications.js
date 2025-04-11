import React from 'react';
import { FaBell, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNotifications } from '../contexts/NotificationContext';

const RequestNotifications = () => {
  const { notifications, markAsRead, removeNotification } = useNotifications();
  const requestNotifications = notifications.filter(n => n.type === 'request');

  if (requestNotifications.length === 0) return null;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="request-notifications p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaBell className="mr-2 text-blue-600" /> Medicine Requests
        </h2>
      </div>

      <div className="space-y-3">
        {requestNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between p-3 border rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
          >
            <div className="flex-1">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                {formatTimestamp(notification.timestamp)}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  markAsRead(notification.id);
                  // Additional logic for accepting request
                }}
                className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                title="Accept Request"
              >
                <FaCheckCircle />
              </button>
              <button
                onClick={() => removeNotification(notification.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                title="Dismiss"
              >
                <FaTimesCircle />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestNotifications;