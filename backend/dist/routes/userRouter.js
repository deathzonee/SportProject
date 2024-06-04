const express = require("express");
const router = express.Router();
const middleware = require("../middleware/userMiddleware");
const userController = require("../controllers/userController");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/get-users", middleware.verifyToken, userController.getAllUsers);
router.delete(
  "/:id",
  middleware.verifyTokenAndAdminAuth,
  userController.deleteUser
);
router.post("/refresh", userController.requestRefreshToken);
router.post("/logout", middleware.verifyToken, userController.userLogout);
module.exports = router;
