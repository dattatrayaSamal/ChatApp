import React from "react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import animationbutton from "../animations/button.json";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { ChevronLeftIcon } from "@chakra-ui/icons";
// import { IconButton } from "@chakra-ui/react";
import { toast } from "react-toastify"; // Importing toastify
import "../styles/singleChat.css";

import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const ENDPOINT = "https://deployapi-ub0q.onrender.com/";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationbutton,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `https://deployapi-ub0q.onrender.com/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    // if (event.key === "Enter" && newMessage)
    if (newMessage && (event.key === "Enter" || event.type === "click")) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://deployapi-ub0q.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        // toast.error("Failed to send the Message");
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {/* Here Back button need to be added And profile pic need to be added */}
            <ChevronLeftIcon
              color="black.500"
              boxSize={8}
              cursor="pointer"
              onClick={() => {
                setSelectedChat(null); // Reset selected chat state
                navigate("/");
              }}
            />

            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl isRequired mt={3}>
              {istyping && (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              )}
              <Box display="flex" alignItems="center" gap="2">
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message..."
                  value={newMessage}
                  onChange={typingHandler}
                  onKeyDown={sendMessage}
                />
                <IconButton
                  colorScheme="blue"
                  aria-label="Send message"
                  icon={
                    <Lottie options={defaultOptions2} width={40} height={40} />
                  }
                  onClick={sendMessage}
                  isDisabled={!newMessage.trim()}
                  borderRadius="50%"
                  size="lg"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg", transform: "scale(1.1)" }}
                  transition="all 0.2s"
                />
              </Box>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

// import React from "react";
// import { ChatState } from "../Context/ChatProvider";
// import { Box, IconButton, Text } from "@chakra-ui/react";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

// const SingleChat = ({fetchAgain, setFetchAgain}) => {
//   const { user, selectedChat, setSelectedChat } = ChatState();
//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontFamily="sans-serif"
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             display="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               display={{ base: "flex", md: "none" }}
//               icon={<ArrowBackIcon />}
//               onClick={() => setSelectedChat("")}
//             />
//             {!selectedChat.isGroupChat ? (
//               <>
//                 {getSender(user, selectedChat.users)}
//                 <ProfileModal user={getSenderFull(user, selectedChat.users)} />
//               </>
//             ) : (
//               <>
//                 {selectedChat.chatName.toUpperCase()}
//                 {
//                   <UpdateGroupChatModal
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 }
//               </>
//             )}
//           </Text>
//           <Box
//             display="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"
//           ></Box>
//         </>
//       ) : (
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           h="100%"
//         >
//           <Text fontSize="3xl" pb={3} fontFamily="work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;
