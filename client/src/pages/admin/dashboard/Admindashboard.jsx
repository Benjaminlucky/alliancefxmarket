import React from "react";
import { adminDashboardLinks } from "../../../data";
import { Link } from "react-router-dom";

function Admindashboard() {
  return (
    <main className="adminDashboard__section w-full bg-gray-100">
      <div className="adminDashboard__wrapper w-full flex flex-col lg:flex-row mx-auto">
        <aside className="adminDashboard__sidebar bg-white shadow-md w-full lg:w-1/5 p-4 lg:p-0">
          <ul className="flex flex-col gap-3 py-4 mt-10">
            {adminDashboardLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.link}
                  className="flex items-center gap-3 py-2 px-4 hover:bg-secondary-light transition-all duration-300"
                >
                  {React.createElement(link.icon, {
                    className: "text-3xl text-gray-700",
                  })}
                  <span className="text-lg text-gray-700">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="mainarea flex-1 bg-white shadow-md">
          <div className="mainArea__content p-4 md:p-10">
            {/* Top Section */}
            <div className="topsection mb-4 md:mb-8">
              <h1 className="text-xl md:text-2xl text-gray-500">
                <span className="font-bold text-gray-700">Hello Admin</span>,
                Welcome to your Dashboard
              </h1>
            </div>

            {/* Mid Section */}
            <div className="midsection grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="users bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                  1,837
                </h2>
                <div className="total__users__count text-gray-600">
                  Total Users
                </div>
              </div>

              <div className="revenue bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                  $176,897.86
                </h2>
                <div className="total__revenue__count text-gray-600">
                  Total Revenue
                </div>
              </div>

              <div className="payouts bg-gray-100 p-4 md:p-6 rounded-lg shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                  $42,654.43
                </h2>
                <div className="total__payouts__count text-gray-600">
                  Total Pending Payouts
                </div>
              </div>
            </div>

            {/* All Users Section */}
            <div className="allusers mt-6">
              <div className="allusersContent">
                <div className="usersTitle text-lg md:text-2xl font-bold text-gray-500">
                  All Users
                </div>
                <div className="usersTable py-4">
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        <tr className="bg-white border-b hover:bg-gray-100">
                          <th
                            scope="row"
                            className="px-4 py-2 font-medium text-gray-900"
                          >
                            Jay Kalavenie
                          </th>
                          <td className="px-4 py-2">jayne@hotmail.com</td>
                          <td className="px-4 py-2">+1(201)70093722</td>
                          <td className="px-4 py-2">$2999</td>
                          <td className="px-4 py-2">
                            <img
                              src="./assets/ranAvatar.avif"
                              className="w-8 h-8 rounded-full"
                              alt="avatar"
                            />
                          </td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Admindashboard;
