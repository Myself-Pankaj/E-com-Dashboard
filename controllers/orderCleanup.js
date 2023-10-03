// Import necessary modules and dependencies
import { CronJob } from 'cron';
import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';
import { Product } from '../models/itemModel.js';
// Replace with your Order model

// Define the cleanup task function
const cleanupOrders = async () => {
  try {
    // Calculate the date three months ago
    const threeMonthsAgo = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
    
    // Delete orders older than three months with status "Delivered"
    await Order.deleteMany({ orderStatus: 'Delivered', deliveredAt: { $lt: threeMonthsAgo } });
    
    console.log('Order cleanup completed.');
  } catch (error) {
    console.error('Error cleaning up orders:', error);
  }
};

// Start the task
const startTask = () => {
  // Run the cleanup task every day at 12:00 AM
  const job = new CronJob('0 0 0 * * *', cleanupOrders);
  job.start();
  
  console.log('Task initiated.');
};

export { startTask };

//Cart Controller

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // User ID of the currently logged-in user
    const productId = req.body.productId; // ID of the product to add to cart
    const quantity = Number(req.body.quantity); // Selected quantity

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the product already exists in the cart
    const existingCartItem = user.cart.find((item) => item.product.toString() === productId);

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      existingCartItem.quantity += quantity;
    } else {
      // Add a new cart item if the product doesn't exist in the cart
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const cartItem = {
        product,
        quantity: quantity,
      };

      user.cart.push(cartItem);
    }

   
    await user.save();

   

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id; // User ID of the currently logged-in user
    const productId = req.body.productId; // ID of the product to update in cart
    const newQuantity = Number(req.body.quantity); // New quantity for the product

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the product already exists in the cart
    const existingCartItem = user.cart.find((item) => item.product.toString() === productId);

    if (!existingCartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Update the quantity of the existing cart item
    existingCartItem.quantity = newQuantity;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
      error: error.message,
    });
  }
};


export const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to authenticate and attach the user object to the request

    const user = await User.findById(userId).populate('cart.product');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    next(error);
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // User ID of the currently logged-in user
    const productId = req.params.id; // ID of the product to remove from cart

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the index of the cart item with the matching product ID
    const cartIndex = user.cart.findIndex((item) => item.product.toString() === productId);

    if (cartIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    // Remove the cart item from the user's cart array
    user.cart.splice(cartIndex, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};

export const deleteAllItemsFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // User ID of the currently logged-in user

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove all items from the user's cart
    user.cart = [];

    await user.save();

    res.status(200).json({
      success: true,
      message: "All items removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing items from cart",
      error: error.message,
    });
  }
};

//WishList
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // User ID of the currently logged-in user
    const productId = req.body.productId; // ID of the product to add to the wishlist

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the product already exists in the wishlist
    const isProductInWishlist = user.wishlist.includes(productId);

    if (isProductInWishlist) {
      return res.status(400).json({
        success: false,
        message: "Product is already in the wishlist",
      });
    }

    // Add the product to the wishlist
    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product to wishlist",
      error: error.message,
    });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // User ID of the currently logged-in user
    const productId = req.params.id; // ID of the product to remove from the wishlist

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the index of the product in the wishlist array
    const productIndex = user.wishlist.indexOf(productId);

    if (productIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Product is not in the wishlist",
      });
    }

    // Remove the product from the wishlist
    user.wishlist.splice(productIndex, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing product from wishlist",
      error: error.message,
    });
  }
};


