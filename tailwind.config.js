/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1877f2',
        'primary-dark': '#166fe5',
      },
    },
  },
  plugins: [],
}
