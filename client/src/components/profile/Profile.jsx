import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, resetUser } from "../redux/slices/Userslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedFullName && storedAuthToken) {
      setFullName(storedFullName);

      dispatch(
        setUser({
          fullName: storedFullName,
          authToken: storedAuthToken,
          isVerified: localStorage.getItem("isVerified") === "true",
          profileImage: localStorage.getItem("userAvatar"),
        })
      );

      fetchProfileImage(storedAuthToken);
      getUserStatus(storedAuthToken);
    } else {
      setError("User data not found in localStorage.");
      setLoading(false);
    }
  }, [dispatch]);

  const fetchProfileImage = async (token) => {
    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setProfileImage(data?.profileImage || null);
    } catch (error) {
      setError("Error fetching profile image.");
    }
  };

  const getUserStatus = async (token) => {
    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/user/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setIsVerified(data?.isVerified || false);
    } catch (error) {
      setError("Error fetching user status.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    dispatch(resetUser());
    localStorage.clear();
    navigate("/signin");
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      // Determine API base URL based on environment
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      try {
        setLoading(true);

        // Use dynamic base URL
        const response = await axios.post(
          `${API_BASE_URL}/user/upload-avatar`, // Dynamic endpoint
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        console.log("Upload response:", response.data);

        // Update profile image and Redux store
        const updatedUser = {
          fullName: localStorage.getItem("fullName") || "Unknown User",
          authToken: localStorage.getItem("authToken"),
          isVerified: localStorage.getItem("isVerified") === "true",
          profileImage: response.data.avatarUrl || "/default-avatar.png",
        };

        dispatch(setUser(updatedUser));
        localStorage.setItem("userAvatar", response.data.avatarUrl);
        setProfileImage(response.data.avatarUrl);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="profileSection flex items-center gap-5 h-10 mb-10 text-white">
          {/* Profile Section */}
          <div className="relative">
            <img
              src={profileImage || "/default-avatar.png"}
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-500"
            />
            <label
              htmlFor="uploadAvatar"
              className="absolute bottom-2 right-2 bg-gray-900 text-white p-2 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553 4.553M9.25 9.25L5.25 13.25M3 11.75C3 6.5 6.5 3 11.75 3s8.75 3.5 8.75 8.75-3.5 8.75-8.75 8.75S3 16.5 3 11.75z"
                />
              </svg>
            </label>
            <input
              id="uploadAvatar"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
          <div className="mt-4 text-left">
            <h2 className="font-bold text-2xl">{`Hello, ${fullName}`}</h2>
            <p className="text-gray-400">Track your investment journey here</p>
            <p>Status: {isVerified ? "Verified" : "Not Verified"}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 ml-10 rounded-md transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
