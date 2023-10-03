
import express from "express";
import { SearchOrder, dailyCount, getMyOrders, getOrderDetails, getSingleOrder, paymentVerification, placeOrder, placeOrderOnline, processOrder } from "../controllers/orderController.js";
import { isAdminOrVendor, isAuthenticated } from "../middleware/auth.js";
import { addToCart, addToWishlist, deleteAllItemsFromCart, getCart, removeFromCart, removeFromWishlist, updateCart } from "../controllers/orderCleanup.js";

// import { addToCart } from "../controllers/cartController.js";

const router = express.Router();


router.post("/place-order", isAuthenticated, placeOrder);

router.post("/place-online-order", isAuthenticated, placeOrderOnline);

router.post("/payment-verification", isAuthenticated, paymentVerification);

router.route("/order/:id").get(isAuthenticated, isAdminOrVendor, getSingleOrder);

router.get('/myorders', isAuthenticated, getMyOrders);

router.get('/myorder/:id', isAuthenticated, getOrderDetails);

router.get('/processing-order/:id', isAuthenticated, isAdminOrVendor, processOrder);

router.get('/daily-count', isAuthenticated, isAdminOrVendor, dailyCount); // daliy order count 

router.get('/seach-order', isAuthenticated, isAdminOrVendor, SearchOrder); //search order for vendor


//cart Route

router.post('/add-to-cart', isAuthenticated, addToCart);

router.get('/get-cart', isAuthenticated, getCart);

router.put('/update-cart', isAuthenticated, updateCart);


router.delete('/remove-from-cart/:id', isAuthenticated,removeFromCart)

router.delete('/clear-cart', isAuthenticated,deleteAllItemsFromCart)

//wishList

router.post('/add-to-wishlist', isAuthenticated, addToWishlist);

router.delete('/remove-from-wishlist/:id', isAuthenticated,removeFromWishlist)



export default router;
