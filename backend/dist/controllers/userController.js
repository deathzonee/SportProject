const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let refreshTokens = [];
const userController = {
  registerUser: async (req, res) => {
    try {
      const { email, username, dateofbirth } = req.body;
      const emailUser = await User.findOne({ email: email });
      if (emailUser) {
        return res.send("Email already exits");
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const response = await User.create({
        email: email,
        username: username,
        password: hashed,
        dateofbirth: dateofbirth,
      });
      const { password, ...data } = response._doc;
      return res.status(200).json({
        success: true,
        message: "Registered successfully",
        user: data,
      });
    } catch (error) {
      console.log("error: ", error);
      return res
        .status(500)
        .json({ success: false, message: "Server internal error" });
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2h" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "365d",
      }
    );
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Email not found" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res
          .status(404)
          .json({ success: false, message: "wrong email or password" });
      }

      if (user && validPassword) {
        const accessToken = userController.generateAccessToken(user);
        const refreshToken = userController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshtoken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        const { password, ...data } = user._doc;

        if (user.admin) {
          return res.status(200).json({
            success: true,
            data: data,
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: "Admin login successful",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: data,
            accessToken: accessToken,
            message: "Login successful",
          });
        }
      }
    } catch (error) {
      console.log("error :", error);
      return res
        .status(500)
        .json({ success: false, message: "Server internal error" });
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log("🚀 ~ jwt.verify ~ err:", err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = userController.generateAccessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshtoken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  userLogout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      }
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .json({ success: true, message: "User logged out" });
    } catch (error) {
      return res.status(500).json("error:", error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json({ message: true, message: user });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server internal error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res
        .status(200)
        .json({ message: true, message: "Delete user successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
