import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        150: "150px",
        640: "640px",
        900: "900px",
      },
      height:{
        548: '548px'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customPink: "#c76c6c",
        customPinkOpacity03: "rgba(199, 108, 108, 0.3)",
        customPinkOpacity05: "rgba(199, 108, 108, 0.5)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
