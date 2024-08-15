import React from "react";
import Sidebar from "../components/Sidebar";
import MiniProfile from "../components/MiniProfile";
import SuggestedList from "../components/SuggestedList";

const Home = () => {
  
  return (
    <div className="w-full flex">
      <div className="flex-1">feeds</div>

      <div className="w-1/4 border-l p-6 h-screen">
        <MiniProfile />
        <SuggestedList />
      </div>
    </div>
  );
};

export default Home;
