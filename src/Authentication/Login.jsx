import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useGlobalContext } from "../Context&Reducers/Context";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [admin, setAdmin] = useState(initialState);
  const [show, setShow] = useState(false);
  const { loginAdmin } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const data = await loginAdmin(admin);
    if (data.success) {
      toast.success("Loggedin Successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setAdmin(initialState);
      localStorage.setItem("e-comm-admin", JSON.stringify(data.user));
      navigate("/");
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Box w="100%" marginTop={"22px"}>
      <FormControl margin={"25px 0"}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          bg="gray.300"
          placeholder="Type here.."
          required
          value={admin.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl margin={"25px 0"}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            bg="gray.300"
            required
            value={admin.password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        type="button"
        colorScheme="teal"
        size="md"
        margin="16px 0 0"
        onClick={handleSubmit}
      >
        Login
      </Button>
      <ToastContainer transition={Zoom} />
    </Box>
  );
};

export default Login;
