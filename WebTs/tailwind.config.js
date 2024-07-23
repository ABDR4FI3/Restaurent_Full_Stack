/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      fontFamily: {
        libre: ['"Libre Bodoni"'],
      },
      colors: {
        "dark-bg": "#121212",
        "lighter-dark": "#222126",
        "dark-yellew": "#bf8e43",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        wave: "wave 1s ease-in-out forwards",
      },
      backgroundImage: {
        svgpattern: "url('./src/assets/Img/pattern/pattern.svg')",
        svgdarkpattern: "url('./src/assets/Img/pattern/patterndark.svg')",
        home1: "url('./src/assets/Img/Home/homebackground.jpg')",
        home2: "url('./src/assets/Img/Home/plat.png')",
        home3: "url('./src/assets/Img/pattern/homebackground.png')",
        interior: "url('./src/assets/Img/Home/interior.jpg')",
      },
    },
  },
  variants: {
    extend: {
      translate: ["responsive", "hover", "focus"],
    },
  },
  plugins: [],
};
