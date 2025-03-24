// import React, { useEffect } from "react";
// import {
//   Box,
//   Container,
//   Text,
//   Tabs,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
// } from "@chakra-ui/react";
// import Login from "../components/Authentication/Login";
// import Signup from "../components/Authentication/Signup";
// import { useNavigate } from "react-router-dom";

// function Homepage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userInfo"))

//     if (user) {
//       navigate("/chats")
//     }
//   }, [navigate])

//   return (
//     <Container maxW="xl" centerContent>
//       <Box
//         d="flex"
//         justifyContent="center"
//         p={3}
//         bg={"white"}
//         w="100%"
//         m="40px 0 15px"
//         borderRadius="lg"
//         borderWidth="1px"
//       >
//         <Text
//           fontSize="4xl"
//           textAlign="center"
//           // fontFamily
//           color="black"
//         >
//           We Chat
//         </Text>
//       </Box>
//       <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
//         <Tabs isFitted variant="soft-rounded">
//           <TabList mb="1em">
//             <Tab>Login</Tab>
//             <Tab>Sign Up</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <Login />
//             </TabPanel>
//             <TabPanel>
//               <Signup />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     </Container>
//   );
// }

// export default Homepage;
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  VStack,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Box
      bgGradient="linear(to-r, blue.800, blue.600)"
      minH="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Container maxW="md" centerContent>
        {/* Header Section */}
        <VStack spacing={4} mb={8}>
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
            fontFamily="Poppins, sans-serif"
          >
            Welcome to{" "}
            <Text as="span" color="orange.300">
              WeChat
            </Text>
          </Text>
          <Text fontSize="md" color="gray.200" textAlign="center">
            Chat seamlessly with friends and family anywhere in the world.
          </Text>
        </VStack>

        {/* Tabs Section */}
        <Box
          bg="white"
          w="100%"
          p={6}
          borderRadius="lg"
          boxShadow="2xl"
          overflow="hidden"
        >
          <Tabs isFitted variant="soft-rounded" colorScheme="blue">
            <TabList mb={4}>
              <Tab
                fontWeight="bold"
                fontSize="md"
                _selected={{
                  bgGradient: "linear(to-r, orange.400, orange.300)",
                  color: "white",
                }}
                _hover={{
                  bgGradient: "linear(to-r, orange.500, orange.400)",
                  color: "white",
                }}
              >
                Login
              </Tab>
              <Tab
                fontWeight="bold"
                fontSize="md"
                _selected={{
                  bgGradient: "linear(to-r, orange.400, orange.300)",
                  color: "white",
                }}
                _hover={{
                  bgGradient: "linear(to-r, orange.500, orange.400)",
                  color: "white",
                }}
              >
                Sign Up
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
}

export default Homepage;
