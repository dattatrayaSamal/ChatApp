import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // Set background and text color globally
      body: {
        bg: "white", // Light mode background
        color: "black", // Light mode text color
        _dark: {
          bg: "black", // Dark mode background
          color: "white", // Dark mode text color
        },
      },

      // Specific customizations for Chakra UI components
      // Box component background and text color
      Box: {
        _dark: {
          bg: "white", // Dark mode background for Box
          color: "white", // Text color in dark mode
        },
      },

      div: {
        _dark: {
          bg: "black", // Dark mode background for Box
          color: "gray.500", // Text color in dark mode
        },
      },

      // Text component color
      Text: {
        _dark: {
          color: "gray.500", // Text color in dark mode
        },
      },
      // Menu component background and text color
      Menu: {
        _dark: {
          bg: "gray.400", // Dark mode background for Menu
          color: "white", // Menu text color in dark mode
        },
      },

      // List component background and text color
      List: {
        _dark: {
          bg: "gray.400", // Dark mode background for List
          color: "white", // List text color in dark mode
        },
      },
      // Links (a) background and color
      a: {
        _dark: {
          color: "blue.200", // Link color in dark mode
        },
      },

      ProfileModal: {
        _dark: {
          bg: "gray.600", // Dark mode background for Button
          color: "white", // Button text color in dark mode
        },
      },
      // Button component styling
      Button: {
        _dark: {
          bg: "gray.900", // Dark mode background for Button
          color: "white", // Button text color in dark mode
        },
      },
      ModalOverlay: {
        _dark: {
          bg: "rgba(233, 203, 203, 0.7)", // Dark overlay background
        },
      },
    },
  },
});

export default theme;
