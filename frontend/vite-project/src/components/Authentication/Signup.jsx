// import React, { useState } from "react";
// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";  // Corrected import from "react-router-dom"

// const Signup = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const toast = useToast();

//   const navigate = useNavigate();  // Correct usage of useNavigate

//   const [name, setName] = useState("");  // Initialize with an empty string
//   const [email, setEmail] = useState("");  // Initialize with an empty string
//   const [confirmpassword, setConfirmpassword] = useState("");  // Initialize with an empty string
//   const [password, setPassword] = useState("");  // Initialize with an empty string
//   const [pic, setPic] = useState("");
//   const [picLoading, setPicLoading] = useState(false);

//   const submitHandler = async () => {
//     setPicLoading(true);
//     if (!name || !email || !password || !confirmpassword) {
//       toast({
//         title: "Please Fill all the Fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//       return;
//     }
//     if (password !== confirmpassword) {
//       toast({
//         title: "Passwords Do Not Match",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }
//     console.log(name, email, password, pic);
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "https://deployapi-ub0q.onrender.com/api/user",
//         {
//           name,
//           email,
//           password,
//           pic,
//         },
//         config
//       );
//       console.log(data);
//       toast({
//         title: "Registration Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setPicLoading(false);
//       navigate("/chats");  // Corrected use of navigate
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//     }
//   };

//   const postDetails = (pics) => {
//     setPicLoading(true);
//     if (pics === undefined) {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }
//     console.log(pics);
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "chat-app");
//       data.append("cloud_name", "piyushproj");
//       fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(data.url.toString());
//           setPicLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setPicLoading(false);
//         });
//     } else {
//       toast({
//         title: "Please Select a Valid Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//       return;
//     }
//   };

//   return (
//     <VStack spacing="5px">
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="emails" isRequired>
//         <FormLabel>Email Address</FormLabel>
//         <Input
//           type="email"
//           placeholder="Enter Your Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="passwords" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="confirm-password" isRequired>  {/* Corrected id */}
//         <FormLabel>Confirm Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmpassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="pic">
//         <FormLabel>Upload your Picture</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         />
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={picLoading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default Signup;

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState();
  const [email, setEmail] = useState(""); // Initialize with an empty string
  const [confirmpassword, setConfirmpassword] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select a Valid Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://deployapi-ub0q.onrender.com/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Resgistration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };
  return (
    <VStack>
      <FormControl>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
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
      <FormControl id="confirm-password">
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
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
      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
  bgGradient="linear(to-r, orange.400, orange.300)"
  color="white"
  fontWeight="bold"
  width="100%"
  borderRadius="md"
  mt={4}
  onClick={submitHandler}
  isLoading={picLoading}
  _hover={{
    bgGradient: "linear(to-r, orange.500, orange.400)",
    boxShadow: "md",
  }}
  _active={{
    bgGradient: "linear(to-r, orange.600, orange.500)",
    transform: "scale(0.98)",
  }}
>
  Sign Up
</Button>

    </VStack>
  );
};
export default Signup;
