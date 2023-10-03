import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../Redux/Auth/AuthAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Users = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.getUser);
  // console.log(users);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUser(page));
  }, [dispatch, page]);



  return (
    <div className="user-carousel">
      <Carousel infiniteLoop autoPlay showStatus={false} showThumbs={false}>
        {users && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id}>
              <UserCard user={user} />
            </div>
          ))
        ) : (
          <h4>Loading</h4>
        )}
      </Carousel>
    </div>
  );
};

export default Users;

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar.url}  alt="Avatar"/>
      <h3>{user.name}</h3>
    </div>
  );
};
