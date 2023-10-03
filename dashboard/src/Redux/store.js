import { configureStore } from "@reduxjs/toolkit";

import { authReducer, getUserReducer, updateUserReducer, userDetailReducer } from "./Auth/AuthReducer";
import { addItemReducer, itemDetailReducer, itemReducer, deleteItemReducer, updateItemReducer } from "./Product/ProductReducer.js";
import { getOrderReducer, processOrder } from "./Order/orderReducer";
import { videoReducer } from "./Media/MediaReducer";



const store = configureStore({
  reducer: {
    //Authentication
    auth: authReducer,
    getUser:getUserReducer,
    userInfo:userDetailReducer,
    updateUser:updateUserReducer,

    //Admin
    addItem: addItemReducer,
   

    //Items
    items: itemReducer,
    details:itemDetailReducer,
    update:updateItemReducer,
    delete:deleteItemReducer,

    //Orders
    orders:getOrderReducer,
    process:processOrder,
    
    //Media
    media:videoReducer,
    
  },
});

export default store;

export const serverUrl = "https://m-attar-plazaa.onrender.com/attar/v1";
