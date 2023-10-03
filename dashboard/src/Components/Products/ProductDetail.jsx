import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; // Step 2
import {
  deleteProduct,
  getProductDetails,
  updateProduct,
} from "../../Redux/Product/ProductAction";
import ImageCarousel from "./ImageCrousel";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
} from "../EditorToolbar/EditorToolbar";
import toast from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.details);
  const { loading, message, error } = useSelector((state) => state.update);
  const {
    loading: deleteLoading,
    message: deleteMsg,
    error: deleteError,
  } = useSelector((state) => state.delete);

  const { id } = useParams();

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const categories = ["Attar", "Surma", "Others", "Dhoop", "M-special"];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/products");
    }
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: "clearError" });
    }

    if (deleteMsg) {
      toast.success(deleteMsg);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, deleteError, deleteMsg]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(id));

      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setStock(product.Stock || "");
      setOldImages(product.images || []);
      setImagePreview(product.imagePreview || []);
    }
  }, [product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (product.name !== name) {
      formData.set("name", name);
    } else {
      formData.set("name", product.name);
    }

    if (product.price !== price) {
      formData.set("price", price);
    } else {
      formData.set("price", product.price);
    }

    if (product.description !== description) {
      formData.set("description", description);
    } else {
      formData.set("description", product.description);
    }

    if (product.category !== category) {
      formData.set("category", category);
    } else {
      formData.set("category", product.category);
    }

    if (product.Stock !== Stock) {
      formData.set("Stock", Stock);
    } else {
      formData.set("Stock", product.Stock);
    }

    if (images.length === 0) {
      product.images.forEach((image) => {
        formData.append("images", image);
      });
    } else {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    dispatch(updateProduct(id, formData));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setOldImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  if (!product || Object.keys(product).length === 0) {
    return <div className="product-detail">Product not found</div>;
  }

  return (
    <motion.div
      className="product-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form className="createProductForm" encType="multipart/form-data">
        <div className="row_1">
          <div className="product-image">
            {oldImages && oldImages.length > 0 ? (
              <ImageCarousel images={oldImages.map((image) => image.url)} />
            ) : (
              <ImageCarousel images={imagePreview} />
            )}
            <input
              type="file"
              accept="image/*"
              name="images"
              id="file-input"
              multiple
              onChange={updateProductImagesChange}
            />
          </div>
          <div className="product-info">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </motion.p>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder={"Description."}
            modules={modules}
            formats={formats}
          />
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button
              onClick={updateProductSubmitHandler}
              isDisabled={loading}
              isLoading={loading}
            >
              Update
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button
              isDisabled={deleteLoading}
              isLoading={deleteLoading}
              onClick={handleDelete}
              colorScheme="red"
            >
              Delete
            </Button>
            
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );
};
export default ProductDetail;
