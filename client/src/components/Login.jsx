import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "./Form";
import { useContext, useState } from "react";
import { globalContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData, setIsAuthenticated } = useContext(globalContext);
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const onSubmitHandler = async (e, data) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        const userData = {
          id: res.data._id,
          username: res.data.username,
          colors: res.data.colors,
          colorPalettes: res.data.colorPalettes,
        };
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
        setUserData(userData);
        setIsAuthenticated(true);
        navigate("/home");
      })
      .catch((err) => {
        const { username, password } = err.response.data.errors;
        setFormErrors({
          username,
          password,
        });
      });
  };

  return <Form onSubmitHandler={onSubmitHandler} formErrors={formErrors} />;
};

export default Login;
