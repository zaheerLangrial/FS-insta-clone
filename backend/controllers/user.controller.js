import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { Post } from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";


export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {bio, gender} = req.body;
    console.log('bio', bio);
    console.log('userId', userId)
    const profilePicture = req.file;
    console.log("Profile PIcture  =>", profilePicture)
    let cloudResponse;

    if(profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri)
    }

    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      })
    }

    if(bio) user.bio = bio;
    if(gender) user.gender = gender;
    if(profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: 'Profile updated',
      success: true,
      user
    })
  } catch (error) {
    console.log('Error in edit profile api' , error)
  }
}

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("password", password);
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email already registered",
        success: false,
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in register", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("If Statement", { email, password });

      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    let validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcryptjs.compare(
      password,
      validUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const populatePosts = await Promise.all(
      validUser.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(validUser._id)) {
          return post;
        }
        return null;
      })
    );

    const user = {
      _id: validUser._id,
      username: validUser.username,
      email: validUser.email,
      profilePicture: validUser.profilePicture,
      bio: validUser.bio,
      followers: validUser.followers,
      following: validUser.following,
      posts: populatePosts,
    };
    const token = await jwt.sign(
      { userId: validUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log("error in login", error);
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in logout", error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).select("-password");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {}
};

export const getSuggestionUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res.status(400).json({
        message: "Currently do not have any users",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log("error in getSuggestion Users", error);
  }
};

export const followOrUnFollow = async (req, res) => {
  try {
    const followKarneWala = req.id;
    const jisKoFollowKiya = req.params.id;
    if (followKarneWala === jisKoFollowKiya) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(followKarneWala);
    const targetUser = await User.findById(jisKoFollowKiya);

    if (!user || !targetUser) {
      return req.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isFollowing = user.following.includes(targetUser._id);
    if (isFollowing) {
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $pull: { following: jisKoFollowKiya } }
        ),
        User.updateOne(
          { _id: jisKoFollowKiya },
          { $pull: { followers: followKarneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Unfollowed successfully",
        success: true,
      });
    } else {
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $push: { following: jisKoFollowKiya } }
        ),
        User.updateOne(
          { _id: jisKoFollowKiya },
          { $push: { followers: followKarneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "Followed Successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log("error in follow or unfollowing", error);
  }
};
