import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";
import { Button } from "./ui/button";
import { DotIcon, MenuSquare } from "lucide-react";

const Post = ({ username, avatar, image, caption }) => {
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
              <Button variant="ghost">
                <MenuSquare />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 12h16M4 16h16"
              />
            </svg>
          </button>
          <button className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.386 4.553a1 1 0 001.228 0L19 8m0 0a12.042 12.042 0 01-3 7.563A11.973 11.973 0 0112 20.5a11.973 11.973 0 01-4-4.937A12.042 12.042 0 015 8"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Post Caption */}
      <div className="px-4 py-2">
        <span className="font-semibold">{username} </span>
        <span>{caption}</span>
      </div>
    </div>
  );
};

export default Post;
