import React, { useState } from "react";
import { usePosts } from "../context/PostContext";
import { FaBell, FaTimes } from "react-icons/fa";
import "./Notifications.css";

function Notifications() {
  const { notifications, markNotificationRead } = usePosts();
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-container">
      <button
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">No notifications yet</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? "read" : ""}`}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">
                      {new Date(notification.id).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;

