const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('dark', savedTheme === 'dark');
} else {
  // If no saved theme, use system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  body.classList.toggle('dark', prefersDark);
}

// Update the button icon based on the current theme
const updateButtonIcon = () => {
  const img = darkModeToggle.querySelector('img');
  const isDarkMode = body.classList.contains('dark');
  img.src = isDarkMode ? 'photos/to_light.png' : 'photos/to_dark.png';
};
updateButtonIcon();

// Add event listener to toggle dark mode
darkModeToggle.addEventListener('click', () => {
  const isDarkMode = body.classList.toggle('dark');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateButtonIcon();
});