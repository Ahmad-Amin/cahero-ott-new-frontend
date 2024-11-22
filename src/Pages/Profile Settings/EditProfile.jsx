import React, { useState, useEffect } from "react";
import SidebarLayout from "../../layout/SidebarLayout";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper"
const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    password: "",
  });

  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/me"); 
        const userData = response.data;
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          phoneNumber: userData.phoneNumber || "",
          password: "", // Do not prefill password for security
        });
        setUserId(userData.id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await axiosInstance.patch(`/user?id=${userId}`, formData);
      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };


  return (
    <SidebarLayout>
        <LoadingWrapper loading={loading}>
      <div>
        <h1 className="font-semibold text-white text-4xl mb-10">
          Edit Profile
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="John"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="John@xyz.com"
              disabled
              readOnly
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
            placeholder="3066 zoeni 12st lahoree"
          />
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="Lahore"
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="Pakistan"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="12345678999"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
            placeholder="12345aaaa"
          />
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="text-white bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Update
          </button>
        </div>
      </form>
      </LoadingWrapper>
    </SidebarLayout>
  );
};

export default EditProfile;
