import { createTheme } from "@mui/material/styles";
import { red, blue, grey } from "@mui/material/colors";

const lightPrimaryColor = "#f9f9f9";
const darkPrimaryColor = "#1e1e1e";
const notificationColors = [
  "#614BF2",
  "#1f1c40",
  "#6CBAD9",
  "#D9756C",
  "#3457dc",
  // "#07c095",
  // "#F2F2F2",
];

const theme = createTheme({
  palette: {
    primary: {
      main: lightPrimaryColor,
    },
    secondary: {
      main: red[500],
    },
    mode: "light",
    notification: {
      main: notificationColors[0],
      secondary: notificationColors[1],
      tertiary: notificationColors[2],
      alert: notificationColors[3],
      background: notificationColors[4],
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Lato, sans-serif",
        },
      },
    },
  },
});

// Dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkPrimaryColor,
    },
    secondary: {
      main: red[700], // Adjust this based on your design
    },
    // Add additional custom colors for dark mode
    notification: {
      main: notificationColors[0],
      secondary: notificationColors[1],
      tertiary: notificationColors[2],
      alert: notificationColors[3],
      background: notificationColors[4],
    },
  },
});

export { theme, darkTheme };
