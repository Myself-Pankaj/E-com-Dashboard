import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddProduct from "./Components/Products/AddProduct";

import ProductDetail from "./Components/Products/ProductDetail";

import Order from "./Components/DashboardItems/Order";
import Items from "./Components/DashboardItems/Items";
import MyMedia from "./Components/DashboardItems/MyMedia";
import User from "./Components/DashboardItems/User";

function App() {
  return (
    <Fragment>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/dashboard/orders" element={<Order />} />
            <Route path="/dashboard/products" element={<Items />} />
            <Route path="/dashboard/media" element={<MyMedia />} />
            <Route path="/dashboard/users" element={<User />} />

            {/* Product Cornner */}
            <Route path="/add-products" element={<AddProduct />} />
            {/* <Route path="/products" element={<AllProducts/>} /> */}
            <Route exact path="/product/:id" element={<ProductDetail />} />
          </Routes>
          <Toaster />
        </Router>
      </>
    </Fragment>
  );
}

export default App;
