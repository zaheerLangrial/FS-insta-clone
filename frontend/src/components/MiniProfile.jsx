import React from "react";

const MiniProfile = () => {
    const profilePic =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723593600&semt=ais_hybrid";
  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <img
          src={profilePic}
          alt="Profile Pic"
          width={40}
          height={40}
          className=" rounded-full"
        />
        <p className="flex-1 text-lg font-semibold">Zaheer Ahmad</p>
        <button className="text-blue-500 font-semibold ">Logout</button>
      </div>
    </>
  );
};

export default MiniProfile;
