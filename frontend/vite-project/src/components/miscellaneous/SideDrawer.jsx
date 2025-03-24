import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  effect,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Badge,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";
import { Spinner } from "@chakra-ui/spinner";
import { getSender } from "../../config/ChatLogics";
import { toast } from "react-toastify";
import ColorModeToggle from "../../ColorModeToggle";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `https://deployapi-ub0q.onrender.com/api/user?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description:
          error?.response?.data?.message || "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      // console.log(error)
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `https://deployapi-ub0q.onrender.com/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        // bg={colorMode === "light" ? "white" : "gray.800"}
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderRadius="md"
        // color={colorMode === "light" ? "black" : "white"}
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom">
          <Button
            variant="ghost"
            display="flex"
            // backgroundColor= "rgb(206, 203, 203)"
            alignItems="center"
            onClick={onOpen}
          >
            <i className="fas fa-search" style={{ color: "#121212" }}></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="cursive" flex={1} textAlign="center">
          We Chat
        </Text>
        <ColorModeToggle />
        <div>
          <Menu>
            <div style={{ position: "relative", display: "inline-block" }}>
              <MenuButton p={1}>
                <BellIcon fontSize="2xl" m="1" />
              </MenuButton>
              {notification.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-1px",
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "3px 7px",
                    fontSize: "10px",
                    zIndex: 1,
                  }}
                >
                  {notification.length}
                </span>
              )}
            </div>
            <MenuList pl={3}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
