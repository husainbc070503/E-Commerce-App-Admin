import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useGlobalContext } from "../Context&Reducers/Context";
import { toast, ToastContainer, Zoom } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  type: "",
};

const Register = () => {
  const { registerAdmin } = useGlobalContext();

  const [admin, setAdmin] = useState(initialState);
  const [show, setShow] = useState(false);

  const handleChange = (e) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (admin.password !== admin.cpassword)
      return toast.error("Mismatch Password", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    if (admin.type === "")
      return toast.error("Please select type", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    const data = await registerAdmin(admin);
    if (data.success) {
      toast.success("Registered Successfully", {
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
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          bg="gray.300"
          placeholder="Type here.."
          required
          value={admin.name}
          onChange={handleChange}
        />
      </FormControl>
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
      <FormControl margin={"25px 0"}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="cpassword"
            bg="gray.300"
            required
            value={admin.cpassword}
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
      <FormControl margin={"25p 0"}>
        <FormLabel>Type</FormLabel>
        <Radio
          colorScheme="green"
          value="admin"
          name="type"
          onChange={handleChange}
        >
          Admin
        </Radio>
      </FormControl>
      <Button
        type="button"
        colorScheme="teal"
        size="md"
        margin="20px 0 0"
        onClick={handleSubmit}
      >
        Register
      </Button>
      <ToastContainer transition={Zoom} />
    </Box>
  );
};

export default Register;
