import React from "react";
import { CopyIcon, HeartIcon, HomeIcon, MenuIcon, MessagesSquareIcon, PlusCircle, SearchIcon, UserCircle, VideoIcon } from "lucide-react";


const Sidebar = () => {
  return (
    <>
      <div className="w-1/5 sticky top-0 border-r h-screen flex flex-col justify-between ">
        <div className="h-[130px]">
          <img src="src/assets/Insta-signup-logo.png" alt="Insta logo" />
        </div>

        <div className="w-full flex flex-col px-6 flex-1">
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <HomeIcon />
            <span>Home</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <SearchIcon />
            <span>Search</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <CopyIcon />
            <span>Explore</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <VideoIcon />
            <span>Reels</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <MessagesSquareIcon />
            <span>Messages</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <HeartIcon />
            <span>Notifications</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <PlusCircle />
            <span>Create</span>
          </button>
          <button className="flex justify-start gap-2 text-base font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <UserCircle />
            <span>Profile</span>
          </button>
        </div>

        <div className="p-6">
          <button className="flex w-full justify-start gap-2 text-xl font-bold items-center p-3 hover:bg-gray-200 rounded-xl">
            <MenuIcon size={28} />
            <span>More</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
