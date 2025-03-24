import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://deployapi-ub0q.onrender.com/api/user/login", // Update endpoint as required
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save user data
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl>
        <Input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              style={{ border: "none", background: "transparent" }}
            >
              {/* Conditional rendering of the icon */}
              <i
                className={`fa ${show ? "fa-eye" : "fa-eye-slash"}`}
                style={{ color: "#0d0d0d" }}
              />
            </button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        bgGradient="linear(to-r, orange.400, orange.300)"
        color="white"
        fontWeight="bold"
        width="100%"
        borderRadius="md"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
        _hover={{
          bgGradient: "linear(to-r, orange.500, orange.400)",
          boxShadow: "md",
        }}
        _active={{
          bgGradient: "linear(to-r, orange.600, orange.500)",
          transform: "scale(0.98)",
        }}
      >
        Login
      </Button>
    </VStack>
  );
};
export default Login;
