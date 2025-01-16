import React from "react";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

import "./admin.css";

function Admin() {
  return (
    <main className="admin__section w-full">
      <div className="admin__wrapper mt-20 w-4/5 mx-auto">
        <div className="admin__content flex flex-col items-center  md:px-32 py-20">
          <form
            action=""
            className="w-full md:w-2/5 flex flex-col items-center "
          >
            <div className="admin__title flex  items-center ">
              <h1 className="text-lg md:text-3xl font-bold py-8 text-2xl text-gray-700 !text-left ">
                Please Sign in to your Dashboard
              </h1>
            </div>
            <div className="formcontent w-full">
              <div className="emailinput flex items-center border-2 border-gray-300 rounded-lg p-2">
                <MdEmail className="text-3xl text-gray-700 " />

                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input border-none w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                />
              </div>
              <div className="passwordInput flex items-center border-2 border-gray-300 rounded-lg focus:ring-0 mt-5 p-2">
                <MdOutlinePassword className="text-3xl text-gray-700" />
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="border-none w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                />
              </div>
              <div className="submitBtn w-full mt-5 bg-secondary-light rounded-lg p-3 text-xl font-bold text-gray-700 flex items-center justify-center hover:bg-white hover:border-2 hover:border-secondary-light transition-all duration-300">
                <button type="submit">Login to Dashboard</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Admin;
