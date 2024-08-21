// import sharp from "sharp";
import sharp from "sharp";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const addNewPost = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "Image upload failed",
        success: false,
      });
    }

    try {
      const { caption } = req.body;
      const image = req.file;
      const authorId = req.id;
      console.log("image===>", image);
      console.log("caption===>", caption);
      console.log("authorId===>", authorId);

      if (!image)
        return res.status(400).json({
          message: "Image required",
          success: false,
        });

      const optimizedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      const post = await Post.create({
        caption,
        image: cloudResponse.secure_url,
        author: authorId,
      });

      const user = await User.findById(req.id);

      if (user) {
        user.posts.push(post._id);
        await user.save();
      }

      await post.populate({ path: "author", select: "-password" });

      return res.status(201).json({
        message: "New post added",
        post,
        success: true,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        message: "Server error",
        success: false,
      });
    }
  });
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.id;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username, profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log("error in get user posts", error);
  }
};

export const likePost = async (req, res) => {
  try {
    const postLikeaKarneWalyKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    await post.updateOne({ $addToSet: { likes: postLikeaKarneWalyKiId } });
    await post.save();

    return res.status(200).json({
      message: "Post liked",
      success: true,
    });
  } catch (error) {
    console.log("error in like post api", error);
  }
};

export const DisLikePost = async (req, res) => {
  try {
    const postLikeaKarneWalyKiId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    await post.updateOne({ $pull: { likes: postLikeaKarneWalyKiId } });
    await post.save();

    return res.status(200).json({
      message: "Post disliked",
      success: true,
    });
  } catch (error) {
    console.log("error in like post api", error);
  }
};
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentKarneWalyUserKiId = req.id;
    const { text } = req.body;

    const post = await Post.findById(postId);

    if (!text)
      return res
        .status(400)
        .json({ message: "text is required", success: false });

    const comment = await Comment.create({
      text,
      author: commentKarneWalyUserKiId,
      post: postId,
    }).populate({
      path: "author",
      select: "username, profilePicture",
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      message: "Comment Added",
      comment,
      success,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username, profilePicture"
    );

    if (!comments)
      return res
        .status(404)
        .json({ message: "No comments found", success: false });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log("error in get comment of post", error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: "Unauthorized" });

    await Post.findByIdAndDelete(postId);

    const user = await User.findById(authorId);

    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    console.log("error in delete Comment", error);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res.status(200).json({
        type: "unsaved",
        message: "Post removed from bookmark",
        success: false,
      });
    } else {
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res
        .status(200)
        .json({ type: "saved", message: "Post bookmarked", success: true });
    }
  } catch (error) {
    console.log("error in bookmark api", error);
  }
};
