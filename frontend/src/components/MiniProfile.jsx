import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice";

const MiniProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    const res = await axios.get('http://localhost:8500/api/v1/user/logout')
    console.log('res===>', res.data)
    dispatch(setAuthUser(null))
  }

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
          className="rounded-full"
        />
        <p className="flex-1 text-lg font-semibold">{user?.username}</p>
        <button onClick={handleLogout} className="text-blue-500 font-semibold ">Logout</button>
      </div>
    </>
  );
};

export default MiniProfile;
