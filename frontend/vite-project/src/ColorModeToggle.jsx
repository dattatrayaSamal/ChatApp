import React from "react";
import { useColorMode, Box, Flex } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="button"
      onClick={toggleColorMode}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="30px" // Outer box width (adjust to control overall size)
      height="30px" // Outer box height should be equal to width to make it circular
      bg={colorMode === "light" ? "gray.300" : "gray.700"}
      borderRadius="full" // Fully round box
      cursor="pointer"
      transition="all 0.3s ease-in-out"
      boxShadow="lg"
      _hover={{ bg: colorMode === "light" ? "gray.400" : "gray.900" }}
    >
      {/* Inner circle for the icon */}
      <Flex
        align="center"
        justify="center"
        width="26px" // Size of the circle for the icon
        height="26px" // Make sure it's a circle too
        bg="white"
        borderRadius="full" // Circular background for the icon
        boxShadow="md"
      >
        {/* Sun and Moon icons */}
        {colorMode === "light" ? (
          <SunIcon color="yellow.500" />
        ) : (
          <MoonIcon color="blue.300" />
        )}
      </Flex>
    </Box>
  );
}

export default ColorModeToggle;
