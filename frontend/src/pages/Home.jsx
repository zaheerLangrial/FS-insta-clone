import React, { useEffect, useState } from "react";
import MiniProfile from "../components/MiniProfile";
import SuggestedList from "../components/SuggestedList";
import Post from "../components/Post";
import axios from "axios";
import { toast } from "sonner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    console.log("Start");
    try {
      setLoading(true);
      console.log("loading");
      const res = await axios.get("http://localhost:8500/api/v1/post/all", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("response Data ====>", res.data);
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex">
      {/* Feeds */}
      <div className="flex-1 mt-10">
        {posts.map((post) => {
          return <Post post={post} />;
        })}
      </div>

      <div className="w-1/3 border-l p-6 h-screen">
        <MiniProfile />
        <SuggestedList />
      </div>
    </div>
  );
};

export default Home;
