import React from "react";
import { adminDashboardLinks } from "../../../data";
import { Link } from "react-router-dom";

function Admindashboard() {
  return (
    <main className="adminDashboard__section w-full bg-gray-100">
      <div className="adminDashboard__wrapper w-full flex mx-auto">
        <div className="adminDashboard__content flex w-full gap-5 py-20">
          {/* Sidebar */}
          <aside className="adminDashboard__sidebar w-1/5 bg-white shadow-md">
            <ul className="flex flex-col gap-3 py-8">
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

          {/* Main Content Area */}
          <div className="mainarea w-4/5 bg-white shadow-md">
            <div className="mainArea__content p-10">
              {/* Top Section */}
              <div className="topsection mb-8">
                <h1 className="text-2xl text-gray-500">
                  <span className="font-bold text-gray-700">Hello Admin</span>,
                  Welcome to your Dashboard
                </h1>
              </div>

              {/* Mid Section */}
              <div className="midsection grid grid-cols-3 gap-6">
                {/* Total Users */}
                <div className="users bg-gray-100 p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-700">1,837</h2>
                  <div className="total__users__count text-gray-600">
                    Total Users
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="revenue bg-gray-100 p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-700">
                    $176,897.86
                  </h2>
                  <div className="total__revenue__count text-gray-600">
                    Total Revenue
                  </div>
                </div>

                {/* Total Payouts */}
                <div className="payouts bg-gray-100 p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-700">
                    $42,654.43
                  </h2>
                  <div className="total__payouts__count text-gray-600">
                    Total Pending Payouts
                  </div>
                </div>
              </div>
            </div>
            <div className="allusers">
              <div className="allusersContent px-10 py-5">
                <div className="usersTitle text-2xl font-bold text-gray-500">
                  All Users
                </div>
                <div className="usersTable py-8">
                  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Full Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Email Address
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Phone Number
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Investment
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Avatar
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Jay Kalavenie
                          </th>
                          <td class="px-6 py-4">jayne@hotmail.com</td>
                          <td class="px-6 py-4">+1(201)70093722</td>
                          <td class="px-6 py-4">$2999</td>
                          <td class="px-6 py-4">
                            <img
                              src="./assets/ranAvatar.avif"
                              className="w-[30px] h-[30px] rounded-full"
                            />
                          </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Raul Matheniz
                          </th>
                          <td class="px-6 py-4">Matheniz@oal.com</td>
                          <td class="px-6 py-4">+74(705)8860026</td>
                          <td class="px-6 py-4">$1999</td>
                          <td class="px-6 py-4">
                            <img
                              src="./assets/ranAvatar2.avif"
                              className="w-[30px] h-[30px] rounded-full"
                            />
                          </td>
                        </tr>
                        <tr class="bg-white dark:bg-gray-800 hover:bg-gray-100">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Jahanes Collier
                          </th>
                          <td class="px-6 py-4">collyktv@yahoo.com</td>
                          <td class="px-6 py-4">+(807)83677200</td>
                          <td class="px-6 py-4">$6,889</td>
                          <td class="px-6 py-4">
                            <img
                              src="./assets/ranAvatar.avif"
                              className="w-[30px] h-[30px] rounded-full"
                            />
                          </td>
                        </tr>
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
