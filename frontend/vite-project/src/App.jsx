import React from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { useColorMode, ColorModeProvider } from "@chakra-ui/react";

import theme from "./theme";

import { Route, Routes } from "react-router-dom";

function App() {
  const { colorMode } = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
      
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chats" element={<Chatpage />} />
          </Routes>
        </div>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
