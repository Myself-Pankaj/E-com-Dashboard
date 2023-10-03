// import jwt from "jsonwebtoken";
// import { User } from "../models/userModel.js";



// export const isAuthenticated = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Login First" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded._id);

//     next();
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/Errorhandler.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded._id) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    req.user = await User.findById(decoded._id);

    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const isVendor = (req, res, next) => {
  if (req.user.role !== 'Vendor') {
    return res.status(403).json({
      success: false,
      message: 'Only Vendors are allowed to access this resource',
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      message: 'Only Admin are allowed to access this resource',
    });
  }
  next();
};

export const isAdminOrVendor = (req, res, next) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'Vendor') {
    return res.status(403).json({
      success: false,
      message: 'Only Admin or Vendor are allowed to access this resource',
    });
  }
  next();
};
