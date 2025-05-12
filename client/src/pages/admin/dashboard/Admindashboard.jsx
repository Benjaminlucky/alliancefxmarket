import React, { useEffect, useState } from "react";
import { adminDashboardLinks } from "../../../data";
import { Link } from "react-router-dom";
import Adminprofile from "./Adminprofile";
import { HiMenu } from "react-icons/hi";

function Admindashboard() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showNav, setShowNav] = useState(false); // Mobile menu toggle

  const usersPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      try {
        setIsLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/user/fetchUsers?page=${currentPage}&limit=${usersPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

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
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="adminDashboard__section w-full bg-gray-100 min-h-screen">
      <div className="adminDashboard__wrapper w-full flex flex-col lg:flex-row mx-auto">
        <div className="mainarea flex-1 bg-white shadow-md">
          <div className="mainArea__content px-2 sm:px-1 md:px-2 py-4">
            {/* Top Section */}
            <Adminprofile />

            {/* All Users Section */}
            <div className="allusers mt-6">
              <div className="allusersContent">
                <div className="usersTitle text-base sm:text-lg md:text-2xl font-bold text-gray-500">
                  All Users
                </div>

                <div className="usersTable py-4">
                  <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="min-w-[600px] md:min-w-full w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Full Name
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">Email</th>
                          <th className="px-4 py-2 whitespace-nowrap">Phone</th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Investment
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
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
                              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                {user.fullName}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap break-all">
                                {user.email}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {user.phone || "N/A"}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                ${user.investment || "0"}
                              </td>
                              <td className="px-4 py-2">
                                <img
                                  src={user.avatar || "./assets/ranAvatar.avif"}
                                  className="w-8 h-8 rounded-full"
                                  alt="avatar"
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="pagination mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-600 text-white py-2 px-4 rounded disabled:opacity-50 w-full sm:w-auto"
                >
                  Previous
                </button>

                <span className="text-center">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-secondary-light text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50 w-full sm:w-auto"
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
