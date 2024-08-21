import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

const CreatePostModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    caption: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const imgRef = useRef(null);

  const handleOnChangePost = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setPostData({ ...postData, image: file });

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const url = event.target.result;
          setImagePreview(url);
        };

        reader.onerror = (error) => {
          console.error("File reading error:", error);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const handleCreatePost = async () => {
    console.log('Post DAta =====>' ,postData)
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8500/api/v1/post/addpost",
        {
          image: postData.image,
          caption: postData.caption
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("response ====>", res.data);
      setLoading(false);
      toast(res.data.message);
      setImagePreview("");
      setOpen(false);
    } catch (error) {
      // toast('')
      console.log("error", error);
      toast(error.message);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="font-bold text-xl">Create a post</DialogHeader>
        <Textarea
          className="outline-none"
          placeholder="Enter post description"
          onChange={(e) =>
            setPostData({ ...postData, caption: e.target.value })
          }
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Selected"
            // style={{ marginTop: "10px", maxWidth: "100%" }}
          />
        )}
        <Button variant="secondary" onClick={() => imgRef.current.click()}>
          Add Image
        </Button>
        <input
          type="file"
          className="hidden"
          ref={imgRef}
          accept="image/*"
          onChange={handleOnChangePost}
        />
        <Button onClick={handleCreatePost}>Create Post</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
