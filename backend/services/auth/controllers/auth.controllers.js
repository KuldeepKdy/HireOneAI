import { app } from "../configs/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";

export const GoogleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoin: user.interviewCoin,
      }),
      "EX",
      60 * 60 * 24 * 7,
    );

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json("Google Auth Error", err);
  }
};

export const logOut = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }
    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const useCoins = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (!sessionId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const session = await redis.get(`session:${sessionId}`);
    const sessionData = JSON.parse(session);

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { coins, action } = req.body;
    if (!coins) {
      return res
        .status(400)
        .json({ sucess: false, message: "coins are required" });
    }

    const user = await User.findById(sessionData.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.interviewCoin < coins) {
      return res.status(403).json({
        message: "Not enough interview coins",
        success: false,
        interviewCoin: user.interviewCoin,
      });
    }
    user.interviewCoin -= coins;
    await user.save();

    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoin: user.interviewCoin,
      }),
      "EX",
      60 * 60 * 24 * 7,
    );
    return res.status(200).json({
      success: true,
      message: "Coins used successfully",
      interviewCoin: user.interviewCoin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
