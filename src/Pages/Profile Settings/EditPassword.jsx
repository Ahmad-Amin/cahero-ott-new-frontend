import React, { useState } from "react";
import SidebarLayout from "../../layout/SidebarLayout";

const EditPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(true);

  const requirements = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@#$%^&*+=]/.test(password),
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsMatching(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsMatching(password === value);
  };

  return (
    <SidebarLayout>
      <div>
        <h1 className="font-semibold text-white text-4xl mb-10">
          Edit Password
        </h1>
      </div>

      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12"
              placeholder="Enter your old password"
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={handlePasswordChange}
              className={`border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12 ${
                isMatching ? "" : "border-red-500"
              }`}
              placeholder="Enter your new password"
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`border text-sm rounded-lg block w-full p-2.5 bg-[#0e0e0e] border-[#333333] placeholder-[#858585] text-white outline-none h-12 ${
                isMatching ? "" : "border-red-500"
              }`}
              placeholder="Confirm your new password"
              required
            />
            {!isMatching && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match.
              </p>
            )}
          </div>
        </div>

        <div className="text-[#b2b2b2] mt-6">
          <p className="mb-4">Your Password must contain:</p>
          <ul>
            <li>
              <input
                type="checkbox"
                checked={requirements.length}
                readOnly
                className="mr-2"
              />
              Passwords should be at least 12 characters long
            </li>
            <li>
              <input
                type="checkbox"
                checked={requirements.lower}
                readOnly
                className="mr-2"
              />
              Lowercase letters
            </li>
            <li>
              <input
                type="checkbox"
                checked={requirements.upper}
                readOnly
                className="mr-2"
              />
              Uppercase letters
            </li>
            <li>
              <input
                type="checkbox"
                checked={requirements.number}
                readOnly
                className="mr-2"
              />
              Numbers
            </li>
            <li>
              <input
                type="checkbox"
                checked={requirements.special}
                readOnly
                className="mr-2"
              />
              Special Characters (@#$%^&*+=)
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="mt-6 text-[#b2b2b2] bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          disabled={
            !Object.values(requirements).every((req) => req) || !isMatching
          }
        >
          Save Password
        </button>
      </form>
    </SidebarLayout>
  );
};

export default EditPassword;
