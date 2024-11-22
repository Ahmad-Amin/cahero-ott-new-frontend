import React from 'react';
import SidebarLayout from "../../layout/SidebarLayout";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const ProfileSetting = () => {
  return (
    <SidebarLayout>
      <div className="text-white mt-10">
        <h1 className="font-semibold text-3xl text-white">Account Settings</h1>
        <div className="flex flex-col gap-5 mt-6">
          <Link to={"/profile-settings/edit-profile"}>
            <button className="w-3/4 h-10 bg-[#0e0e0e] hover:bg-[#343434] ease-in-out transition duration-300 mr-10 flex justify-between items-center rounded-lg px-3">
              <p>Edit Profile</p>
              <ChevronRightIcon />
            </button>
          </Link>
          <Link to={"/profile-settings/edit-password"}>
            <button className="w-3/4 h-10 bg-[#0e0e0e] mr-10 flex justify-between items-center rounded-lg px-3 hover:bg-[#343434] ease-in-out transition duration-300">
              <p>Edit Password</p>
              <ChevronRightIcon />
            </button>
          </Link>
          <Link to={"/profile-settings/edit-email"}>
            <button className="w-3/4 h-10 bg-[#0e0e0e] mr-10 flex justify-between items-center rounded-lg px-3 hover:bg-[#343434] ease-in-out transition duration-300">
              <p>Edit Email</p>
              <ChevronRightIcon />
            </button>
          </Link>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ProfileSetting;
