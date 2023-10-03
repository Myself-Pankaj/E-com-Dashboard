import express from "express";
import { isAdmin, isAdminOrVendor, isAuthenticated, isVendor } from "../middleware/auth.js";
import { generateExcelReport, getAdminProducts, getAdminStats, getAdminUsers, getAllOrders } from "../controllers/adminController.js";
import { getAllProducts } from "../controllers/itemController.js";

const router = express.Router();

router.get("/admin-stats", isAuthenticated, isAdminOrVendor, getAdminStats);

router.route("/get-all-product").get(isAuthenticated,isAdminOrVendor,getAdminProducts);

router.route("/get-report").get(isAuthenticated,isAdminOrVendor,generateExcelReport);

router.route("/get-all-user").get(isAuthenticated,isAdminOrVendor,getAdminUsers);

router.route("/get-all-order").get(isAuthenticated,isAdminOrVendor,getAllOrders);








export default router;