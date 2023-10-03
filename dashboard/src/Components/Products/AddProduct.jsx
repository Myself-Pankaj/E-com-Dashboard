import { Button } from "@chakra-ui/react";
import React, {  useEffect, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { FcGallery } from "react-icons/fc";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import EditorToolbar, {
  modules,
  formats,
} from "../EditorToolbar/EditorToolbar";
import { toast } from "react-hot-toast";
import { createNewItem } from "../../Redux/Product/ProductAction";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [images, setSelectedImages] = useState([]); // Use a different name for the state variable
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.addItem);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      setName("");
      setSelectedImages([]); // Clear the selected images state
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImagePreview([]);
    }
  }, [error, message, dispatch]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedImages([]); // Clear the selected images state
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setSelectedImages((old) => [...old, file]); // Store the selected files, not the data URLs
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image); // Append the selected files, not the data URLs
    });
    console.log(myForm)
    dispatch(createNewItem(myForm));
  };

  return (
    
      <section className="productContainer">
        <div>
          <form className="productForm" onSubmit={submitHandler}>
            <div>
              <span>
                <label>Name.</label>
                <input
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </span>

              <span>
                <label>Price.</label>
                <input
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </span>
              <span>
                <label>Category.</label>
                <input
                  value={category}
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </span>
              <span>
                <label>Stock.</label>
                <input
                  value={Stock}
                  type="number"
                  onChange={(e) => setStock(e.target.value)}
                />
              </span>
              <span>
                <div className="file-input-container">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    id="file-input"
                    onChange={createProductImagesChange}
                    multiple
                  />
                  <label htmlFor="file-input" className="file-input-label">
                    <FcGallery />
                  </label>
                </div>
              </span>
            </div>
            <span className="secondRow">
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                placeholder={"Description."}
                modules={modules}
                formats={formats}
              />
            </span>
            <Button
              rightIcon={<AiOutlineLogin />}
              type="submit"
              isDisabled={loading}
              isLoading={loading}
              variant="solid"
              width="10rem"
              colorScheme="pink"
            >
              ADD
            </Button>
          </form>
        </div>
      </section>
    
  );
};

export default AddProduct;
