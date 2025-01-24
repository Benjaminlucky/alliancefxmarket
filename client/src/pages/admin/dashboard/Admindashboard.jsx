import React, { useEffect, useState } from "react";
import { adminDashboardLinks } from "../../../data";
import { Link } from "react-router-dom";
import Adminprofile from "./Adminprofile";

function Admindashboard() {
  const [userData, setUserData] = useState([]); // State to store user data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

  const usersPerPage = 20; // Number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      try {
        setIsLoading(true);

        // Make the API request with pagination parameters
        const response = await fetch(
          `${API_BASE_URL}/user/fetchUsers?page=${currentPage}&limit=${usersPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.users)) {
          setUserData(data.users);
          setTotalPages(data.totalPages);
        } else {
          setUserData([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]); // Re-fetch users when the current page changes

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="adminDashboard__section w-full bg-gray-100">
      <div className="adminDashboard__wrapper w-full flex flex-col lg:flex-row mx-auto">
        <div className="mainarea flex-1 bg-white shadow-md">
          <div className="mainArea__content p-4 md:p-10">
            {/* Top Section */}
            <Adminprofile />
            {/* All Users Section */}
            <div className="allusers mt-6">
              <div className="allusersContent">
                <div className="usersTitle text-lg md:text-2xl font-bold text-gray-500">
                  All Users
                </div>
                <div className="usersTable py-4">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-2">
                              Full Name
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Email Address
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Phone Number
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Investment
                            </th>
                            <th scope="col" className="px-4 py-2">
                              Avatar
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="text-center py-4">
                                No users found.
                              </td>
                            </tr>
                          ) : (
                            userData.map((user, index) => (
                              <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-100"
                              >
                                <td className="px-4 py-2 font-medium text-gray-900">
                                  {user.fullName}
                                </td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                  {user.phone || "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                  ${user.investment || "0"}
                                </td>
                                <td className="px-4 py-2">
                                  <img
                                    src={
                                      user.avatar || "./assets/ranAvatar.avif"
                                    }
                                    className="w-8 h-8 rounded-full"
                                    alt="avatar"
                                  />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="pagination mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-600 text-white py-2 px-4 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="mx-4">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-secondary-light text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Admindashboard;
