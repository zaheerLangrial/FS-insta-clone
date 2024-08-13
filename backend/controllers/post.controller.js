// import sharp from "sharp";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

export const addNewPost = async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;
    const authorId = req.id;

    if (!image)
      return res.status(400).json({
        message: "Image required",
        success: false,
      });

    // const optimizedImageBuffer = await sharp(image.buffer)
    //   .resize({ width: 800, height: 800, fit: "inside" })
    //   .toFormat("jpeg", { quality: 80 })
    //   .toBuffer();

    const post = await Post.create({
      caption,
      image: imageUrl,
      author: authorId,
    });

    const user = await User.findById(authorId);

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
  }
};
