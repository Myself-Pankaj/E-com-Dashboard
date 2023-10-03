import cloudinary from "cloudinary";
import { Product } from "../models/itemModel.js";

import { sendMail } from "../utils/sendMail.js";
import APIFEATURE from "../utils/apifeatures.js";
import { User } from "../models/userModel.js";
import fs from "fs";

export const getAllProducts = async (req, res, next) => {
  try {
    const resultPerPage = 10;
    const page = parseInt(req.query.page, 10) || 1;

    const productsCount = await Product.countDocuments();

    const apiFeature = new APIFEATURE(Product.find(), req.query)
      .search()
      .filter();

    const products = await apiFeature.query;

    const filteredProductsCount = products.length;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res) => {
  try {
    // Check if the user is either a vendor or an admin
    if (req.user.role !== "Vendor" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only vendors and admins can create products.",
      });
    }

    const tmpDir = "./tmp";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    let uploadedImages = [];
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      const imagePromises = images.map(async (image) => {
        const myCloud = await cloudinary.v2.uploader.upload(
          image.tempFilePath,
          {
            folder: "Product",
            resource_type: "image",
          }
        );

        return {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      });

      uploadedImages = await Promise.all(imagePromises);
    }

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: uploadedImages,
      category: req.body.category,
      Stock: req.body.Stock,
      user: req.user._id,
    };

    // Now you can safely perform operations in the "./tmp" directory.

    fs.rmSync("./tmp", { recursive: true });

    const product = await Product.create(productData);

    const user = await User.findById(req.user._id);

    await user.save();

    // Send email notification
    const emailContent = `Your product "${product.name}" has been created successfully.`;
    await sendMail(
      req.user.email,
      "Product Creation Notification",
      emailContent
    );

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handling validation errors
      const errorMessage = Object.values(error.errors).map(
        (val) => val.message
      );
      res.status(400).json({
        success: false,
        message: "Validation Error",
        error: errorMessage,
      });
    } else {
      console.log(error); // Other error handling
      res.status(500).json({
        success: false,
        message: "Error creating product",
        error: error.message,
      });
    }
  }
};

// export const updateProduct = async (req, res) => {
//   try {
//     // Check if the user is either a vendor or an admin
//     if (req.user.role !== "Vendor" && req.user.role !== "Admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Only vendors and admins can update products.",
//       });
//     }

//     const productId = req.params.id;

//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Check if the user is the owner of the product
//     if (product.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Access denied. You do not have permission to update this product.",
//       });
//     }

//     const tmpDir = "./tmp";
//     if (!fs.existsSync(tmpDir)) {
//       fs.mkdirSync(tmpDir);
//     }

//     let uploadedImages = [];
//     if (req.files && req.files.images) {
//       const images = Array.isArray(req.files.images)
//         ? req.files.images
//         : [req.files.images];

//         const imagePromises = images.map(async (image) => {
//           const myCloud = await cloudinary.v2.uploader.upload(
//             image.tempFilePath,
//             {
//               folder: "Product",
//               resource_type: "image",
//             }
//           );

//           return {
//             public_id: myCloud.public_id,
//             url: myCloud.secure_url,
//           };
//         });

//         uploadedImages = await Promise.all(imagePromises);
//       }
//       fs.rmSync("./tmp", { recursive: true });

//     const productData = {
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       images: uploadedImages,
//       category: req.body.category,
//       Stock: req.body.Stock,
//     };
//     console.log(uploadedImages);

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       productData,
//       {
//         new: true,
//         runValidators: true,
//       }

//     );
//     console.log(updatedProduct)

//     res.status(200).json({
//       success: true,
//       message: "Product Updated Successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       // Handling validation errors
//       const errorMessage = Object.values(error.errors).map(
//         (val) => val.message
//       );
//       res.status(400).json({
//         success: false,
//         message: "Validation Error",
//         error: errorMessage,
//       });
//     } else {
//       // Other error handling
//       res.status(500).json({
//         success: false,
//         message: "Error updating product",
//         error: error.message,
//       });
//     }
//   }
// };

export const updateProduct = async (req, res) => {
  try {
    // Check if the user is either a vendor or an admin
    if (req.user.role !== "Vendor" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only vendors and admins can update products.",
      });
    }

    const productId = req.params.id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the user is the owner of the product
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to update this product.",
      });
    }

    const tmpDir = "./tmp";
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    let uploadedImages = [];
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagePromises = images.map(async (image) => {
        const myCloud = await cloudinary.v2.uploader.upload(
          image.tempFilePath,
          {
            folder: "Product",
            resource_type: "image",
          }
        );

        return {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      });

      uploadedImages = await Promise.all(imagePromises);
    } else {
      uploadedImages = product.images;
    }

    // Delete the temporary directory
    fs.rmSync("./tmp", { recursive: true });

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: uploadedImages,
      category: req.body.category,
      Stock: req.body.Stock,
    };

    // Use the update method to update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handling validation errors
      const errorMessage = Object.values(error.errors).map(
        (val) => val.message
      );
      res.status(400).json({
        success: false,
        message: "Validation Error",
        error: errorMessage,
      });
    } else {
      // Other error handling
      res.status(500).json({
        success: false,
        message: "Error updating product",
        error: error.message,
      });
    }
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// Import your email sending library or service

export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    // Fetch the user information
    const user = await User.findById(product.user);

    // Send email notification to the product creator

    const emailContent = `
    <html>
        <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        color: #333333;
      }
      .container {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 5px;
      }
      h1 {
        color: #555555;
      }
      p {
        margin-bottom: 10px;
      }
      .highlight {
        font-weight: bold;
        color: #007bff;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>New Product Review</h1>
      <p>A new review has been submitted for your product <span class="highlight">${product.name}</span>.</p>
      <p>Review details:</p>
      <ul>
        <li><strong>Rating:</strong> ${rating}</li>
        <li><strong>Comment:</strong> ${comment}</li>
      </ul>
      <p>Submitted by: ${req.user.name}</p>
    </div>
  </body>
    </html>
`;

    const recipientEmail = user.email; // Replace with the appropriate property of the product creator's email
    await sendMail(recipientEmail, "New Product Review", emailContent);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product review",
      error: error.message,
    });
  }
};

// Get All Reviews of a product

export const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product with reviews",
      error: error.message,
    });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.params.reviewId.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.params.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product review",
      error: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.query; // Extract the category from the query parameters

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Category parameter is missing." });
    }

    const products = await Product.find({ category });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
