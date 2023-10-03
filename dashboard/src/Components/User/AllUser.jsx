import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, updateUser } from "../../Redux/Auth/AuthAction";

const AllUser = () => {
  const dispatch = useDispatch();

  const { users, totalPages } = useSelector((state) => state.getUser);

  console.log(users);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUser(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRole = (email, newRole) => {
    dispatch(updateUser(email, newRole));
    dispatch(getUser(page));
  };

  return (
    <div className="userContainer">
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>User Id</th>
            <th>Img</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user._id}</td>

                <td>
                  <img src={user.avatar.url} alt={user.name} />
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleChangeRole(user.email, e.target.value)
                    }
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No user found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUser;
