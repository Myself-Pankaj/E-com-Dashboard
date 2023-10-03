import express from "express";
import { isAdminOrVendor, isAuthenticated } from "../middleware/auth.js";
import {
  createProduct,
  createProductReview,

  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductReviews,
  getProductsByCategory,
  ProductDetails,
  updateProduct,
} from "../controllers/itemController.js";
import {  deleteFeatureVideo, featureVideoUpload, getAllFeaturedVideos } from "../controllers/featuredVedioController.js";
const router = express.Router();

router.route("/create-product").post(isAuthenticated, createProduct);

router.route("/get-product").get(getAllProducts);

router.route("/product/:id").get(ProductDetails);

router.route("/by-category").get(getProductsByCategory);

router
  .route("/update-product/:id")
  .put(isAuthenticated, isAdminOrVendor, updateProduct);

router
  .route("/delete-product/:id")
  .delete(isAuthenticated, isAdminOrVendor, deleteProduct);

router.route("/review-product").put(isAuthenticated, createProductReview);

router
  .route("/product-review/:id")
  .get(isAuthenticated, getProductReviews);

router
  .route("/product/:productId/reviews/:reviewId")
  .delete(isAdminOrVendor, isAuthenticated, deleteReview);

  ////Vedio -Routes

  router
  .route("/feature-vedio")
  .post(isAuthenticated, isAdminOrVendor, featureVideoUpload);

  router
  .route("/all-feature-vedios")
  .get(isAuthenticated, isAdminOrVendor, getAllFeaturedVideos);

  router
  .route("/delete-feature-vedios/:id")
  .delete(isAuthenticated, isAdminOrVendor, deleteFeatureVideo);


export default router;
