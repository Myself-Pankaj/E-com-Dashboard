import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../../Redux/Auth/AuthAction";

const UserDetail = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userInfo);
  const { id } = useParams();
  const [newRole, setNewRole] = useState(user ? user.role : ''); 

  const email = user ? user.email : '';

  const handleRoleChange = () => {
    if (user) {
      dispatch(updateUser(email, newRole));
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="user-profile">
      <div className="avatar">
        {user.avatar && <img src={user.avatar.url} alt="User Avatar" />}
      </div>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>
          Role:
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="Buyer">Buyer</option>
            <option value="Vendor">Vendor</option>
            <option value="Admin">Admin</option>
          </select>
          <button onClick={handleRoleChange}>Update Role</button>
        </p>
        <p>Member Since: {new Date(user.createdAt).toLocaleDateString()}</p>
        {user.cart.length > 0 && (
          <div className="cart-info">
            <h3>Shopping Cart</h3>
            <ul>
              {user.cart.map((item) => (
                <li key={item.productId}>
                  {item.productName} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
    </div>
  );
};


export default UserDetail;
