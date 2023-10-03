import express from "express";
import {
  UserDetails,
  changeRole,
  confirmDeletion,
  deleteProfile,
  forgetPassword,
  login,
  logout,
  myProfile,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  verify,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

//user routes

router.route("/register").post(register);

router.route("/verify").post(isAuthenticated, verify);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/modify/password").put(isAuthenticated, updatePassword);

router.route("/modify/profile").put(isAuthenticated, updateProfile);

router.route("/delete/profile").delete(isAuthenticated, deleteProfile);

router.route("/confirm-deletion").get(confirmDeletion);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

router.route("/changerole").put(isAuthenticated, changeRole);

router.route("/user/:id").get(isAuthenticated, UserDetails);




export default router;
