import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import{FaSearchengin} from 'react-icons/fa';
import {motion} from 'framer-motion'
import { searchProducts } from "../../Redux/Product/ProductAction";

const SearchBar = ({ onSearch }) => {
  const [keyword, setSearchText] = useState("");
  const dispatch =useDispatch();
  const handleResultClick = () => {
    onSearch(keyword);
    dispatch(searchProducts(keyword))
  };

  return (
    <div className="container">
    <motion.div
      className="searchContainer"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        className="input"
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        rightIcon={<FaSearchengin />}
        colorScheme='teal'
        variant='solid'
        className="button"
        onClick={handleResultClick}
      >
       
      </Button>
    </motion.div>
  </div>
  );
};

export default SearchBar;
