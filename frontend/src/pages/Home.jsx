import React from "react";
import MiniProfile from "../components/MiniProfile";
import SuggestedList from "../components/SuggestedList";
import Post from "../components/Post";

const Home = () => {
  return (
    <div className="w-full flex">
      {/* Feeds */}
      <div className="flex-1 mt-10">
        <Post
          avatar={
            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723593600&semt=ais_hybrid"
          }
          username={"Zaheer Ahmad"}
          image={"https://imgupscaler.com/images/samples/Imgupscaler_2_2x.webp"}
          caption={"This is by me first post in insta clone"}
        />
      </div>

      <div className="w-1/3 border-l p-6 h-screen">
        <MiniProfile />
        <SuggestedList />
      </div>
    </div>
  );
};

export default Home;
