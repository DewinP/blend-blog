import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    minigrey: "#f4f4f8",
    grenish: "#a3ddcb",
    red: "#f05454",
    skyblue: "#65d6ce",
  },
  background: "#f4f4f8",
  fonts,
  breakpoints,
});

export default theme;
