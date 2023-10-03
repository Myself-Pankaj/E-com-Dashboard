import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import { getAllItems } from "../../Redux/Product/ProductAction";

import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


const AllProducts = () => {
  const dispatch = useDispatch();

  const { products ,totalPages} = useSelector((state) => state.items);
  
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getAllItems(page));
  }, [dispatch,page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleSearch = (query) => {};
  const handleActionClick = (productId) => {
    
  };



  return (
    <div className="productContainer">
      <h1>All Products</h1>
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.Stock}</td>
                <td>
                <Link to={`/product/${product._id}`}>
                Other Deatils
                </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllProducts;
