import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { BookMarkedIcon, HeartIcon, Share2 } from "lucide-react";
import { BiComment } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";

const Post = ({ post }) => {
  console.log('post===>', post)
  const [comment, setComment] = useState('')
  return (
    <div className="max-w-lg mx-auto bg-white border rounded-lg overflow-hidden shadow-lg">
      {/* Post Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={avatar}
          alt={username}
        />
        <div className="ml-3 flex-1">
          <span className="text-sm font-semibold">{username}</span>
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
            <button className="focus:outline-none">
            <CiMenuKebab className="text-black" />
          </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[250px]">
              <Button className='mt-3'>
                Unfollow
              </Button>
              <Button>
                Add to Favorites
              </Button>
              <Button>
                Copy link
              </Button>
              <Button>
                Go to post
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Post Image */}
      <div>
        <img className="w-full object-cover" src={image} alt="Post content" />
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="focus:outline-none">
            <HeartIcon />
          </button>
          <button className="focus:outline-none">
            <BiComment size={22} />
          </button>
          <button className="focus:outline-none">
            <Share2 />
          </button>
        </div>
        <button className="focus:outline-none">
            <BookMarkedIcon />
          </button>
      </div>

      <div className="px-4">
        <span className="font-semibold">100 Likes</span>
      </div>
      {/* Post Caption */}
      <div className="px-4">
        <span className="font-semibold">{username} : </span>
        <span>{caption}</span>
      </div>

      <div className="px-4 flex">
        <input type="text" placeholder="Enter your comment" className="outline-none w-full" value={comment} onChange={(e) => setComment(e.target.value.trim())} />
        {
          comment && <button className=" font-bold text-blue-500">Post</button>
        }
      </div>
    </div>
  );
};

export default Post;
