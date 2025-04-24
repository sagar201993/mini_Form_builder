/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React project source files
    "./public/index.html", // Optional if you need to target raw HTML
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px", // Extra small devices (e.g., small phones)
        // Default Tailwind breakpoints:
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // For responsive forms
    require("@tailwindcss/typography"), // For responsive text layout (prose)
    require("@tailwindcss/aspect-ratio"), // For responsive media (e.g., videos/images)
  ],
};
