import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLayout from "../../layout/SidebarLayout";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";

const EditEmail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/me");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newEmail = e.target.newEmail.value;

    try {
      await axiosInstance.patch(`/user?id=${user.id}`, { email: newEmail });
      alert("Email updated successfully!");
      setShowChangeForm(false); 
    } catch (error) {
      console.error("Failed to update email:", error);
    }
  };

  return (
    <SidebarLayout>
      <div>
        <h1 className="font-semibold text-white text-4xl mb-10">Edit Email</h1>
      </div>
      <LoadingWrapper loading={loading}>
        <AnimatePresence mode="wait">
          {user && !showChangeForm && (
            <motion.div
              key="view-email"
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Current Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email || ""}
                      readOnly
                      className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
                      placeholder="John@email.com"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChangeForm(true)}
                  className="text-white bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Change
                </button>
              </form>
            </motion.div>
          )}
          {showChangeForm && (
            <motion.div
              key="change-email"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleFormSubmit}>
                <div className="grid gap-6 mb-6 grid-cols-2">
                  <div>
                    <label
                      htmlFor="newEmail"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter New Email
                    </label>
                    <input
                      type="email"
                      id="newEmail"
                      required
                      className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
                      placeholder="Enter your new email"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="text-white bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChangeForm(false)}
                    className="text-white bg-gray-600 hover:bg-gray-500 ease-in-out transition duration-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </LoadingWrapper>
    </SidebarLayout>
  );
};

export default EditEmail;
