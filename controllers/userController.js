import { User } from "../models/userModel.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import fs from "fs";
import jwt from "jsonwebtoken";

export const register = async (
  { body: { name, email, password }, files: { avatar } },
  res
) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(Math.random() * 1000000);

    const myCloud = await cloudinary.v2.uploader.upload(avatar.tempFilePath, {
      folder: "avatars",
      resource_type: "image",
    });
    fs.rmSync("./tmp", { recursive: true });

    const newUser = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    const emailSendingPromise = sendMail(
      email,
      "Verify Your Account - One-Time Password (OTP)",
      `Dear ${name},

      Thank you for registering with our service. To complete your account verification, please use the following One-Time Password (OTP):
      
      OTP: ${otp}
      Please enter this OTP on the verification page within 5 minutes to verify your account.

      If you did not request this OTP or have any concerns regarding your account, please contact our support team immediately at buyyourdesiredbook@gmail.com.

      Best regards,
      Pankaj`
    );

    await Promise.all([newUser, emailSendingPromise]);

    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        verified: newUser.verified,
      },
      message: "OTP sent to your email, please verify your account",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);

    const user = await User.findById(req.user.id);

    if (!user || user.otp !== otp || user.otp_expiry < Date.now()) {
      if (user.verificationAttempts >= 4) {
        return res.status(400).json({
          success: false,
          message:
            "Maximum verification attempts reached. Please contact support.",
        });
      }

      user.verificationAttempts += 1;
      await user.save();

      return res.status(400).json({
        success: false,
        message:
          "Invalid OTP or has been expired. Remaining attempts: " +
          (5 - user.verificationAttempts),
      });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;
    user.verificationAttempts = 0;

    await user.save();

    // Send email notification
    await sendMail(
      user.email,
      "Account Verification Successful",
      `Dear ${user.name},

      Congratulations! Your account has been successfully verified.

      Thank you for choosing our service.

      Best regards,
      Pankaj`
    );

    sendToken(res, user, 200, "Account verified");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    sendToken(res, user, 200, "Login Successful");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Sorry, the old password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    // Send email notification
    await sendMail(
      user.email,
      "Password Update Notification",
      `Dear ${user.name},

      This is to inform you that your password has been successfully updated. If you did not perform this action, please contact our support team immediately at buyyourdesiredbook@gmail.com.

      Best regards,
      Pankaj`
    );

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const UserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name } = req.body;
    const avatar = req.files.avatar.tempFilePath;
    //
    if (name) {
      user.name = name;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        resource_type: "image",
      });
      fs.rmSync("./tmp", { recursive: true });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generateDeletionToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.DELETION_TOKEN_SECRET, {
    expiresIn: "5h",
  });

  return token;
};

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // Generate deletion token
    const deletionToken = generateDeletionToken(user._id);

    // Send confirmation email with deletion link
    // const deletionLink = `${process.env.BASE_URL}/confirm-deletion?token=${deletionToken}`;
    const deletionLink = `${
      process.env.BASE_URL
    }/confirm-deletion?token=${encodeURIComponent(deletionToken)}`;

    // Send the deletion link to the user's email using your preferred email sending method
    await sendMail(
      user.email,
      "Confirm Account Deletion",
      `<html>
         <head>
           <style>
             /* CSS styles here */
           </style>
         </head>
         <body>
           <p>Dear ${user.name},</p>
           <p>We have received a request to delete your account. If you wish to proceed with the deletion, please click on one of the following buttons:</p>
           <p>
             <a href="${deletionLink}&response=yes" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; margin-right: 10px;">Yes</a>
             <a href="${deletionLink}&response=no" style="background-color: #dc3545; color: #ffffff; padding: 10px 20px; text-decoration: none;">No</a>
           </p>
           <p>If you did not initiate this request or have any concerns, please contact our support team immediately at support@example.com.</p>
           <p>Best regards,</p>
           <p>Your App Team</p>
         </body>
       </html>`
    );

    res.status(200).json({
      success: true,
      message:
        "You will recive the mail soon to close your account in your registerd email account",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmDeletion = async (req, res) => {
  try {
    const { token, response } = req.query;

    // Verify the deletion token
    const decodedToken = jwt.verify(token, process.env.DELETION_TOKEN_SECRET);

    // Get the user ID from the decoded token
    const userId = decodedToken.userId;

    if (response === "yes") {
      // Delete the user and perform any necessary cleanup
      await User.findByIdAndDelete(userId);

      res.clearCookie("token").status(200).json({
        success: true,
        message: "Account deleted successfully.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Account deletion canceled.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name email avatar");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    // Generate a random OTP
    const otp = Math.floor(Math.random() * 1000000);

    // Set the OTP and its expiry in the user document
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

    // Save the user document
    await user.save();

    // Compose the email message
    const subject = "Reset Your Password";
    const body = `
          <p>Hello ${user.name},</p>
          <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to reset your password:</p>
          <h2>${otp}</h2>
          <p>If you did not request this, please ignore this email. The OTP will expire in 10 minutes.</p>
          <p>Best regards,</p>
          <p>Your App Team</p>
        `;

    // Send the email containing the OTP
    await sendMail(email, subject, body);

    res
      .status(200)
      .json({ success: true, message: `An OTP has been sent to ${email}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Set the new password and clear the OTP and its expiry
    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null;

    // Save the updated user document
    await user.save();

    // Send email notification for successful password reset
    const message = "Your password has been successfully reset.";
    await sendMail(user.email, "Password Reset Successful", message);

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    const { role: requestingUserRole } = req.user;

    // Check if the requesting user is an admin
    if (requestingUserRole !== "Admin" && requestingUserRole !== "Vendor") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied. Only admins can change user roles.",
        });
    }

    // Find the user based on the email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the provided role is valid
    const validRoles = ["Vendor", "Buyer","Admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    // Update the user's role
    user.role = role;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
