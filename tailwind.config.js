module.exports = {
  content: [
    './path/to/your/html/files/**/*.html', // specify the paths to your HTML files
    './path/to/your/js/files/**/*.js', // specify the paths to your JS files
    './path/to/your/vue/files/**/*.vue', // specify for Vue files if needed
  ],
  theme: {
    extend: {
      // Add your custom theme extensions here
      colors: {
        primary: '#ff6347', // example custom color
      },
      fontFamily: {
        custom: ['"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode support
};