import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, resetUser } from "../redux/slices/Userslice";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fullName, authToken, isVerified, profileImage } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem("userAvatar") ||
      profileImage || // Default avatar from localStorage or Redux state
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQEBATEBAQ..." // Placeholder image
  );

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");
    const storedFullName = localStorage.getItem("fullName");

    if (!storedAuthToken || !storedFullName) {
      console.log("User is not logged in. Redirecting to login.");
      navigate("/signin");
    } else {
      // Ensure Redux state is synced with localStorage on load
      dispatch(
        setUser({
          fullName: storedFullName,
          authToken: storedAuthToken,
          isVerified: localStorage.getItem("isVerified") === "true",
          profileImage: localStorage.getItem("userAvatar"), // Sync avatar
        })
      );

      // Fetch user profile image from the backend if not set
      if (!profileImage) {
        fetchProfileImage(storedAuthToken);
      }

      setLoading(false);
    }
  }, [navigate, dispatch, profileImage]);

  const fetchProfileImage = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the image URL exists
      if (response.data.profileImage) {
        setUserAvatar(response.data.profileImage);
        localStorage.setItem("userAvatar", response.data.profileImage);
        dispatch(setUser({ profileImage: response.data.profileImage }));
      } else {
        console.error("No profile image found.");
      }
    } catch (error) {
      console.error(
        "Error fetching profile image:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleSignOut = () => {
    // Clear user state and redirect to sign-in page
    dispatch(resetUser());
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("fullName");
    localStorage.removeItem("authToken");
    localStorage.removeItem("isVerified");
    navigate("/signin");
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/user/upload-avatar", // Ensure your backend endpoint matches this
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Update state and local storage with the new avatar URL
        setUserAvatar(response.data.avatarUrl);
        localStorage.setItem("userAvatar", response.data.avatarUrl); // Store avatar in localStorage
        dispatch(setUser({ profileImage: response.data.avatarUrl }));
        setLoading(false);
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profileSection flex items-center gap-5 h-10 mb-10 text-white">
      {/* Profile Section */}
      <div className="relative">
        {/* Avatar */}
        <img
          src={userAvatar}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-500"
        />

        {/* Camera Icon Overlay */}
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

        {/* Hidden Input */}
        <input
          id="uploadAvatar"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </div>

      {/* Welcome Section */}
      <div className="mt-4 text-left">
        <h2 className="font-bold text-2xl">{`Hello, ${fullName || "User"}`}</h2>{" "}
        {/* Default to "User" if fullName is not available */}
        <p className="text-gray-400">Track your investment journey here</p>
      </div>

      {/* Sign-Out Button */}
      <button
        onClick={handleSignOut}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 ml-10 rounded-md transition"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
