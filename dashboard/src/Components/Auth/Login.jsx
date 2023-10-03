import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { login, logoutUser } from "../../Redux/Auth/AuthAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { message, error, loading } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      //clear Email and Psswd
      setEmail("");
    setPassword("");
      
    }
  }, [error, message, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const logoutHandler = async () => {
    dispatch(logoutUser());
  };

  if (!isAuthenticated) {
    return (
      <Fragment>
        <section className="loginContainer">
          <div>
            <Text as="i" spacing={4} fontSize="2rem" color="#f0f8ff">
              M-Attar Plazaa
            </Text>
          </div>
          <form className="loginForm" onSubmit={submitHandler}>
            <div>
              <span>
                <label>E-mail</label>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span>
                <label>Password</label>
                <input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
              <Button
                rightIcon={<AiOutlineLogin />}
                type="submit"
                isDisabled={loading}
                isLoading={loading}
                variant="outline"
              >
                LOGIN
              </Button>
            </div>
          </form>
        </section>
      </Fragment>
    );
  } else {
    // Render the authenticated content (icon and logout button)
    return (
      <Fragment>
        <section className="logoutContainer">
          <div>
            <Text as="i" spacing={4} fontSize="2rem" color="#f0f8ff">
              M-Attar Plazaa
            </Text>
          </div>
          <h3><Text  spacing={4} fontSize="2rem" color="#f0f8ff">
              Hii {user.name} 😎
            </Text></h3>

            <Button
              rightIcon={<AiOutlineLogout />}
              onClick={logoutHandler}
              isDisabled={loading}
              isLoading={loading}
              variant="outline"
            >
              LOGOUT
            </Button>
          
        </section>
      </Fragment>
    );
  }
};

export default Login;
