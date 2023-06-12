import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  theme: {
    screens: {
      xs: "391px",
      ...defaultTheme.screens,
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
