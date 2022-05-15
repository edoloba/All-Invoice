module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "320px",
      mxs: "375px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    fontFamily: {
      sans: ["BebasKai", "sans-serif"],
      serif: ['"BebasKai Slab"', "serif"],
      body: ["BebasKai", "sans-serif"],
    },
    extend: {
      colors: {
        black: { 500: "#3C3744", 600: "#36323d", 700: "#302c36", 800: "#2a2730", 900: "#242129" },
        blue: { 500: "#090C98", 600: "#080b89", 700: "#070a7a", 800: "#06086a", 900: "#05075b" },
        sky: { 500: "#3066BE", 600: "#2b5cab", 700: "#265298", 800: "#224785", 900: "#1d3d72" },
        grey: { 500: "#B4C5E4", 600: "#a2b1cd", 700: "#909eb6", 800: "#7e8aa0", 900: "#6c7689" },
        cream: { 500: "#FBFFF1", 600: "#e2e6d9", 700: "#c9ccc1", 800: "#b0b3a9", 900: "#979991" },
        white: { 500: "#F5F6F7", 900: "#FFFFFF" },
      },
      backgroundImage: () => ({
        "login-background":
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/landing_assets/img/background-1920x1280.jpg')",
        "landing-background":
          "linear-gradient(rgba(0,0,0, 0.2), rgba(0,0,0, 0.2)), url('/src/assets/landing_assets/img/InvoiceGeneratorDark.png')",
        "profile-background":
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/landing_assets/img/background-1920x1080.jpg')",
        "dashboard-background": "linear-gradient(to top, #DFE9F3 0%, white 100%)",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
