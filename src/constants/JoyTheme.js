import { extendTheme } from "@mui/joy/styles";

const dangerPalette = {
  50: "#FFF0F2",
  100: "#FFE0E5",
  200: "#F7C1CB",
  300: "#EE9CA9",
  400: "#E87C8A",
  500: "#E85C6F",
  600: "#D04F62",
  700: "#B64456",
  800: "#993A48",
  900: "#7D303C"
};
const successPalette = {
  50: "#f5f5f5", // lightest
  100: "#e5e5e5",
  200: "#cccccc",
  300: "#b2b2b2",
  400: "#999999",
  500: "#5A5A5A", // your base
  600: "#4d4d4d",
  700: "#3f3f3f",
  800: "#2f2f2f",
  900: "#1f1f1f",

  softBg: "#e5e5e5",
  softColor: "#1f1f1f",
  softHoverBg: "#cccccc",
  softActiveBg: "#b2b2b2",
  solidBg: "#5A5A5A",
  solidColor: "#ffffff",
  outlinedBorder: "#5A5A5A",
  plainColor: "#5A5A5A"
};

// Note: For any theme/color changes, update the colors for the required palette theme and
// for specific colors update options like palette.primary.softBg, palette.primary.softColor, etc.

const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // 'primary' | 'neutral' | 'danger' | 'success' | 'warning' : Default - primary
        primary: {
          100: "#d1e0ff",
          200: "#a3c1ff",
          300: "#75a2ff",
          400: "#4783ff",
          500: "#2a6dff",
          600: "#004fd6",
          700: "#003da8",
          800: "#002b7a",
          900: "#00194a",
          // 100: "#b6c0d0", // Lightest
          // 200: "#8ca0b8", // Very Light
          // 300: "#6280a0", // Light
          // 400: "#386088", // Medium-Light
          // 500: "#03183b", // Base Navy
          // 600: "#02122d", // Medium-Dark
          // 700: "#020c1f", // Dark
          // 800: "#010611", // Very Dark
          // 900: "#000000", // Darkest / Near Black
          // 50: "#f7fbfe",
          // 100: "#edf6fc",
          // 200: "#dfedf8", // your reference shade
          // 300: "#c7e1f3",
          // 400: "#a9d2ec",
          // 500: "#7fbbe2",
          // 600: "#5aa3d6",
          // 700: "#3f8ec4",
          // 800: "#2f6f9e",
          // 900: "#1f4f73",

          solidBg: "#5aa3d6",
          solidColor: "#ffffff",
          solidHoverBg: "#3f8ec4",
          solidActiveBg: "#2f6f9e",
          solidDisabledBg: "#c7e1f3",
          solidDisabledColor: "#ffffff",

          softBg: "#edf6fc",
          softColor: "#2f6f9e",
          softHoverBg: "#dfedf8",
          softActiveBg: "#c7e1f3"
        },
        danger: dangerPalette,
        warning: dangerPalette,
        success: successPalette,
        neutral: {
          50: "#f7f8fa",
          100: "#eff1f4",
          200: "#e3e6ea",
          300: "#d4d8de",
          400: "#c1c6cd",
          500: "#a6acb4",
          600: "#8e949c",
          700: "#6e737a",
          800: "#4a4e53",
          900: "#2e3135",
          outlinedDisabledColor: "var(--font-input-disabled)"
        }
      }
    }
  },
  components: {
    JoySlider: {
      styleOverrides: {
        rail: {
          backgroundColor: "var(--secondary) !important"
        }
      }
    },
    JoySnackbar: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          transitionDuration: "3000ms"
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          transitionDuration: "3000ms"
        }
      }
    }
  }
});

export default joyTheme;
