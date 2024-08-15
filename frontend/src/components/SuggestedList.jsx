import React from "react";

const SuggestedList = () => {
    const profilePic =
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723593600&semt=ais_hybrid";
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h1 className="text-base font-semibold">Suggested for you</h1>
      <div className="flex justify-between items-center gap-2">
        <img
          src={profilePic}
          alt="Profile Pic"
          width={45}
          height={45}
          className=" rounded-full"
        />
        <div className="flex-1">
          <p className="text-base font-medium leading-[16px]">Zaheer Ahmad</p>
          <p className="text-sm leading-[16px]">Suggested for you</p>
        </div>
        <button className="text-blue-500 font-semibold ">Follow</button>
      </div>
      <div className="flex justify-between items-center gap-2">
        <img
          src={profilePic}
          alt="Profile Pic"
          width={45}
          height={45}
          className=" rounded-full"
        />
        <div className="flex-1">
          <p className="text-base font-medium leading-[16px]">Zaheer Ahmad</p>
          <p className="text-sm leading-[16px]">Suggested for you</p>
        </div>
        <button className="text-blue-500 font-semibold ">Follow</button>
      </div>
    </div>
  );
};

export default SuggestedList;
