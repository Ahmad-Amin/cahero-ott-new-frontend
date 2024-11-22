import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import axiosInstance from "../../lib/axiosInstance";
import SidebarLayout from "../../layout/SidebarLayout";
import LoadingWrapper from "../../ui/LoadingWrapper"
const NotificationsUser = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/notifications");
      setNotifications(response.data.results);
    } catch (err) {
      console.error("Error fetching notifications: ", err);
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `https://cahero-ott-f285594fd4fa.herokuapp.com/api/notificationStream?role=${currentUser.role}`
    );

    eventSource.onmessage = function (event) {
      const notification = JSON.parse(event.data);

      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleToggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const totalPages = Math.ceil(notifications.length / pageSize);
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div className="text-white mx-5">{error}</div>;
  }

  return (
    <SidebarLayout>
        <LoadingWrapper loading={loading}>
          <>
      <div className="font-bold text-4xl text-white mx-5">Notifications</div>

      <div className="text-white mx-5 mt-5">
        {Array.isArray(paginatedNotifications) &&
        paginatedNotifications.length > 0 ? (
          paginatedNotifications
            .filter(
              (notification) =>
                (currentUser.role === "admin" &&
                  (notification.recipientType === "Admins" ||
                    notification.recipientType === "All")) ||
                (currentUser.role === "user" &&
                  (notification.recipientType === "Users" ||
                    notification.recipientType === "All"))
            )
            .map((notification) => (
              <div
                key={notification.id}
                className="mb-4 p-4 bg-[#404041] rounded-lg"
              >
                <h1 className="font-semibold text-lg text-white">
                  {notification.notificationType}
                </h1>
                <div
                  className={`notification-description ${
                    expanded[notification.id] ? "expanded" : ""
                  }`}
                >
                  {notification.content}
                </div>
                <Button
                  variant="text"
                  sx={{ color: "#90caf9" }}
                  onClick={() => handleToggleExpand(notification.id)}
                >
                  {expanded[notification.id] ? "Show Less" : "View More"}
                </Button>
                <div className="text-sm text-gray-400">
                  {notification.createdAt.split("T")[0]}
                </div>
              </div>
            ))
        ) : (
          <div className="text-white mx-5">No notifications available</div>
        )}

        <div className="pagination text-white mx-5 mt-5 flex justify-center">
          <button
            variant="text"
            className="px-4 py-2 bg-[#5a49c8] text-white rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white border-2 rounded-md">
            {currentPage} of {totalPages}
          </span>
          <button
            variant="text"
            className="px-4 py-2 ml-2 bg-[#5a49c8] text-white rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <style jsx>{`
        .notification-description {
          max-height: 3em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: max-height 0.3s ease;
        }
        .notification-description.expanded {
          max-height: none;
          white-space: normal;
        }
      `}</style>
      </>
    </LoadingWrapper>
    </SidebarLayout>
  );
};

export default NotificationsUser;
