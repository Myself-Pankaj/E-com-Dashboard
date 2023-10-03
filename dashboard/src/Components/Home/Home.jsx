import React, { Fragment} from "react";
import Login from "../Auth/Login";
import { useSelector } from "react-redux";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      if (user.role === "Admin") {
        // If user is authenticated and has role "admin," redirect to dashboard
        navigate("/dashboard");
      } else {
        // If user is authenticated but not an admin, toast a message
        toast.error("You are not authorized to access the dashboard");
      }
    } else {
      // If the user is not authenticated, show a toast message
      toast.error("Please log in first to access this resource");
    }
  };

  return (
    <Fragment>
      <Login />
      <div className="home-page">
        <div className="background-image"></div>
        <div className="content">
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Login to Access",
                  "To Access Dashboard Please Click the Below Button",
                ],
                autoStart: true,
                loop: true,
                cursor: "",
                wrapperClassName: "typewriterpara",
              }}
            />
          </h1>
          <button onClick={handleButtonClick}>Click Me</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
