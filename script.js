document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for section animation using Tailwind classes only
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', '-translate-x-full');
        void entry.target.offsetWidth;
        entry.target.classList.add('opacity-100', 'translate-x-0');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0 });

  // Force a scroll event to trigger observer for already visible sections
  setTimeout(() => { window.scrollBy(0, 1); window.scrollBy(0, -1); }, 100);

  // Target all main content sections
  const sections = document.querySelectorAll('main > section');
  console.log('Found sections:', sections.length);
  sections.forEach(el => {
    el.style.transitionDelay = '';
    observer.observe(el);
  });

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

  // TODO: fix this for mobile view.
  // Toggle the visibility of the navigation links on mobile
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
});